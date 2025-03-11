import json
import os
from argparse import ArgumentParser, Namespace
from datetime import datetime, timezone, UTC
from http import HTTPStatus

from flask import Flask, Response, request as current_request, current_app, send_from_directory
from requests import request, RequestException

def to_iso(date_time: datetime) -> str:
    """Format a datetime instance to an ISO string"""
    return (f'{date_time.strftime("%Y-%m-%dT%H:%M")}:'
            f'{(date_time.second + date_time.microsecond / 1e6):06.3f}'
            'Z' if date_time.tzname() in [None, str(timezone.utc)]
            else date_time.strftime("%Z")[3:])

def create_response(body: str | bytes,
                    status: int | str | HTTPStatus = 200,
                    content_type = 'application/json',
                    encoding: str | None = None) -> Response:
    """Create a Flask Response object, including default attributes.

    Args:
        body (str | bytes): content of response message, which should be valid JSON string.
        status (int | str | HTTPStatus): the HTTP response status, such as 404 or '200 OK'.
            Default is 200.
        content_type (optional, str): the HTTP Content-Type header. Default is application/json.
        encoding (optional, str | None): the HTTP Content-Encoding header.
            Default is None (encoding is left as default).
    """
    return Response(response=body,
                    status=status,
                    content_type=content_type,
                    mimetype=content_type,
                    headers={'Content-Encoding': encoding} if encoding else None)

def forward_request(url: str,
                    method: str = 'GET',
                    data: bytes | None = None,
                    headers: dict = None,
                    timeout: float = 60) -> Response:
    """Forward the given request to a URL, parse response, then return as Flask Response object

    Args:
        url (str): The full URL of the upstream API.
        method (str): HTTP method. Defaults to 'GET'.
        data (bytes | None, optional): Request body as a bytestring (if request is a POST/PUT call).
            Defaults to None.
        headers (dict): Any HTTP headers to attach to request. Default is None.
        timeout (float, optional): Time (in seconds) to await response from upstream service.
            Defaults to 60.

    Returns:
        Response: JSON-ified Flask Response as received from the upstream API
    """
    try:
        service_response = request(url=url, data=data, method=method, headers=headers,
                                   timeout=timeout)
    except RequestException as exc:
        current_app.logger.warning('Failed to send request to %s: [%s] %s',
                                url, type(exc), str(exc))
        return create_response('', 502)

    # extract response Content-Type and encoding to preserve these in our Flask Response
    response_content_type = service_response.headers.get('Content-Type')
    response_encoding = service_response.headers.get('Content-Encoding')
    current_app.logger.info(
        'Server received response, returning: [%s] content-type: %s, encoding: %s, content: %s',
        service_response.status_code, response_content_type, response_encoding,
        service_response.text
    )

    return create_response((service_response.text if response_encoding in [None, 'utf-8']
                            else service_response.content),
                           service_response.status_code,
                           content_type=response_content_type,
                           encoding=response_encoding)

# Routes
class StaticRoute:
    """Simple router to serve static HTML/JS/CSS files for client UI"""
    def handler(self, path: str = ''):
        """Handle request to /*, which is assumed to be browser/HTML request"""
        static_filepath = os.path.join(current_app.static_folder, path)
        if os.path.exists(static_filepath) and os.path.isfile(static_filepath):
            # request for a specific static file, such as CSS, JS, image asset
            return send_from_directory(current_app.static_folder, path)

        # unrecognized path which may have been changed by React Router.
        # Render static SPA
        return send_from_directory(current_app.static_folder, 'index.html')


class HealthRoute:
    """Router for /health endpoint"""
    def __init__(self, api_url: str, timeout: float | None = None):
        self._app_start_time: datetime = datetime.now(UTC)
        self._timeout = timeout
        self._apis = {
            'api': {'url': api_url, 'health_path': '/foo'}
        }

    def handler(self) -> Response:
        """Handle request to /health endpoint and build response"""
        upstreams: dict[str, dict[str, str | int]] = {}
        # fetch the health of each upstream api to include in response
        for (name, api_config) in self._apis.items():
            health_url = f'{api_config["url"]}{api_config["health_path"]}'
            try:
                response = request('GET', health_url, timeout=self._timeout)
                status_code = response.status_code
            except RequestException as exc:
                current_app.logger.warning('Request to %s failed: %s', health_url, str(exc))
                status_code = 502
            upstreams[name] = {'url': api_config["url"], 'status': status_code}

        uptime = datetime.now(UTC) - self._app_start_time
        response_body = {
            'started_at': to_iso(self._app_start_time),
            'uptime': uptime.total_seconds(),
            'apis': upstreams
        }

        return create_response(json.dumps(response_body))


class APIProxy:
    """Router for External Service APIs endpoints"""
    def __init__(self, url: str, timeout: float | None = None):
        self._url = url
        self._timeout = timeout

    def foo(self) -> Response:
        """Handle request to /foo and forward request to API Service"""
        params = str(current_request.query_string, encoding='utf-8')
        current_app.logger.info('Server received request: %s', current_request.url)
        return forward_request(url=f'{self._url}/foo?{params}',
                               method='GET',
                               headers=current_request.headers,
                               timeout=self._timeout)

class AppWrapper:
    """Web server class wrapping Flask app operations"""
    def __init__(self, api_url: str, static_filepath: str | None = None):
        """Build web app instance, mapping handler to each endpoint"""
        self.app: Flask = Flask(__name__,
                                static_folder=static_filepath,
                                static_url_path='')

        # trim off any trailing slashes in upstream API URLs
        api_url = api_url.rstrip('/')

        # set up proxy routes, configuring appropriate timeout for each endpoint
        health_route = HealthRoute(api_url, timeout=30)
        api_proxy = APIProxy(api_url, timeout=30)

        # register endpoints
        api_base = '/api'
        self.app.add_url_rule(f'{api_base}/health', 'health',
                              view_func=health_route.handler,
                              methods=['GET'])
        self.app.add_url_rule(f'{api_base}/foo', 'foo',
                              view_func=api_proxy.foo,
                              methods=['GET'])

        if static_filepath:
            static_route = StaticRoute()
            self.app.add_url_rule('/', 'root',
                                  view_func=static_route.handler,
                                  methods=['GET'])
            self.app.add_url_rule('/<path:path>', 'assets',
                                  view_func=static_route.handler,
                                  methods=['GET'])

    def run(self, **kwargs):
        """Start up web server"""
        self.app.run(**kwargs)

def create_app(args: Namespace | None = None) -> Flask:
    """Entry point for the Flask web server to start"""
    wrapper = AppWrapper(api_url=args.service_api_url,
                         static_filepath=args.static_path)
    return wrapper.app

if __name__ == '__main__':  # pragma: no cover
    # handle command line arguments required to run the service
    parser = ArgumentParser()
    parser.add_argument('--port',
                        dest='port',
                        default=8080, # chaged from 5000 due to potential port conflict with macos
                        type=int,
                        help='The port the DAS web server will listen on.')
    parser.add_argument('--service_api_url',
                        default='http://minfisvc:8080',
                        type=str,
                        help='The URL where the external API Server is running')
    parser.add_argument('--static_path',
                        default=None,
                        type=str,
                        help='Path to any static (HTML/JS) webpages to serve in addition to API')
    parser.add_argument('--ssl_cert',
                        dest='ssl_cert',
                        default=None,
                        help='Path to server.crt. If non-null, server will attempt to use SSL')
    parser.add_argument('--ssl_key',
                        dest='ssl_key',
                        default=None,
                        help='Path to server.key. If non-null, server will attempt to use SSL')
    _args = parser.parse_args()

    # configure SSL, if cert and key paths provided in argparse
    ssl_context = ((_args.ssl_cert, _args.ssl_key)
                   if (_args.ssl_key and _args.ssl_cert)
                   else None)

    app = create_app(_args)
    app.run(host='0.0.0.0', port=_args.port, debug=False, ssl_context=ssl_context)

elif 'gunicorn' in os.getenv('SERVER_SOFTWARE', default=''):  # pragma: no cover
    # set up container runtime with gunicorn (which doesn't support ArgumentParser)
    API = os.getenv('SERVICE_API_URL', 'http://minfisvc:8080')
    STATIC_PATH = os.getenv('STATIC_PATH', None)  # serve bundled frontend files, if given

    app_wrapper = AppWrapper(api_url=API, static_filepath=STATIC_PATH)
    app = app_wrapper.app

    app.logger.info('Created Flask app with static folder (%s): %s',
                   app_wrapper.app.has_static_folder,
                   app_wrapper.app.static_folder)
