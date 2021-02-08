FROM alpine:3.12

# arguments are defined in .env file and passed in from docker-compose.yml or specified
# on the command line when the image is built
ARG maintainer

LABEL maintainer="${maintainer}"

# avoid python printing issues in docker containers
ENV PYTHONUNBUFFERED=1

RUN echo "**** install Python ****" && \
    apk add --no-cache python3 && \
    if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
    \
    echo "**** install pip ****" && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --no-cache --upgrade pip setuptools wheel && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi

LABEL version="1.0"

COPY ./docker/requirements.txt .
RUN pip install -r requirements.txt

# specify a volume for storage within the container
#VOLUME [ "/data/minfi" ]

WORKDIR /src

COPY ./src/service.py /src/
COPY ./config/server.conf /config/

COPY index.html /src/

ENTRYPOINT ["python3", "service.py"]