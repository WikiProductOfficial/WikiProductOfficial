FROM python:3.9-alpine3.13
LABEL maintainer="backend-server"

ENV PYTHONUNBUFFERED 1

# Setup the working directory
WORKDIR /app

# Install system dependencies
RUN apk update && \
    apk add --no-cache postgresql-client && \
    apk add --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers

# Setup virtual environment
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip

# Copy just the requirements.txt initially
COPY ./requirements.txt /requirements.txt

# Install Python dependencies
RUN /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps

# Copy the rest of your application code after installing dependencies
COPY ./app /app
COPY ./scripts /scripts

# Adjust permissions and create necessary directories
RUN adduser --disabled-password --no-create-home user && \
    mkdir -p /vol/web/static && \
    chown -R user:user /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

# Confirming the port exposed matches the proxy configuration
EXPOSE 8000  

# TODO: Uncomment this for deployment
# USER user

CMD ["run.sh"]
