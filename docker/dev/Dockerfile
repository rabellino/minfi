# Build the client
FROM node:slim AS CLIENT_BUILD

RUN mkdir /client
WORKDIR /client

# Copy client assets
COPY ./client /client

# Run a basic npm install and let it figure out package dependencies
RUN npm install
RUN npm install -D @vitejs/plugin-basic-ssl

# Run a build so the packaged version gets built in the container
RUN npm run build

# ------------------------------------------------------------------------------
# Build the server
FROM python:3.12-alpine as SERVER_BUILD

RUN mkdir /server
WORKDIR /server

# Install all Python dependencies
COPY ./server/requirements.txt /server/requirements.txt
RUN --mount=type=cache,id=custom-pip,target=/root/.cache/pip \
    pip install -r /server/requirements.txt

# Set app arguments for Flask proxy / gateway API
ENV PORT 443
ENV WORKERS 2
ENV LOGLEVEL info

# Copy React bundled code to Flask to be served as static files
COPY --from=CLIENT_BUILD /client/dist /server/static
ENV STATIC_PATH "/server/static"

EXPOSE $PORT

# Copy certs to configure gunicorn to use SSL
COPY ./docker/dev/server.crt /server/server.crt
COPY ./docker/dev/server.key /server/server.key

# Copy server assets
COPY ./server/python/gateway/server.py /server.py

# Create entry script to run service
RUN touch /server/entry.sh
RUN echo "#!/bin/sh" > /server/entry.sh && \
 echo "gunicorn --chdir /server -w \${WORKERS}  \\" >> /server/entry.sh && \
 echo "   -b 0.0.0.0:\${PORT} --worker-tmp-dir /dev/shm \\" >> /server/entry.sh && \
 echo "   --enable-stdio-inheritance --access-logfile - --error-logfile - \\"  >> /server/entry.sh && \
 echo "   --access-logformat '%(h)s %(t)s \"%(r)s\" %(s)s %(b)s \"%(f)s\" \"%(a)s\" %(T)s %(M)s' \\"  >> /server/entry.sh && \
 echo "   --keyfile=/server/server.key \\" >> /server/entry.sh && \
 echo "   --certfile=/server/server.crt \\" >> /server/entry.sh && \
 echo "   --timeout 300 \\" >> /server/entry.sh && \
 echo "    --log-level \${LOGLEVEL} 'app:app' " >> /server/entry.sh && \
 chmod a+x /server/entry.sh

ENTRYPOINT ["/server/entry.sh"]

# Run client in development mode
#CMD [ "npm", "run", "dev" ]