# Build the client
FROM node:slim AS WEBBUILDER

RUN mkdir /web
WORKDIR /web

# Run a basic npm install and let it figure out package dependencies
COPY ./client/package.json ./client/package-lock.json /web/
RUN npm install

# Add SSL packages
#RUN npm install -D @vitejs/plugin-basic-ssl

# Copy client assets
COPY ./client/index.html ./client/vite.config.js /web/
COPY ./client/src /web/src/

# Run a build so the packaged version gets built in the container
RUN npm run build

# ------------------------------------------------------------------------------
# Build the application server
FROM python:3.12-alpine as GUNICORNBUILDER

RUN mkdir /server
WORKDIR /server

# Install all Python dependencies
COPY ./server/requirements.txt /server/requirements.txt
RUN --mount=type=cache,id=custom-pip,target=/root/.cache/pip \
    pip install -r /server/requirements.txt

# Set app arguments for Flask API
ENV PORT 5173
# ENV PORT 443

ENV WORKERS 2
ENV LOGLEVEL info

# Copy React bundled code to Flask to be served as static files
COPY --from=WEBBUILDER /web/dist /server/static
ENV STATIC_PATH "/server/static"

EXPOSE $PORT

# Copy server assets
COPY ./server/app.py /server/app.py

# Create entry script to run service using gunicorn
RUN touch /server/entry.sh
RUN echo "#!/bin/sh" > /server/entry.sh && \
 echo "gunicorn --chdir /server -w \${WORKERS}  \\" >> /server/entry.sh && \
 echo "   -b 0.0.0.0:\${PORT} --worker-tmp-dir /dev/shm \\" >> /server/entry.sh && \
 echo "   --enable-stdio-inheritance --access-logfile - --error-logfile - \\"  >> /server/entry.sh && \
 echo "   --access-logformat '%(h)s %(t)s \"%(r)s\" %(s)s %(b)s \"%(f)s\" \"%(a)s\" %(T)s %(M)s' \\"  >> /server/entry.sh && \
 # SSL certs
 #echo "   --keyfile=/server/server.key \\" >> /server/entry.sh && \
 #echo "   --certfile=/server/server.crt \\" >> /server/entry.sh && \
 echo "   --timeout 300 \\" >> /server/entry.sh && \
 echo "    --log-level \${LOGLEVEL} 'app:app' " >> /server/entry.sh && \
 chmod a+x /server/entry.sh

ENTRYPOINT ["/server/entry.sh"]