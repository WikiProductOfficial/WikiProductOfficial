FROM python:3.9
LABEL maintainer="backend-server"

ENV PYTHONUNBUFFERED 1

# Setup the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update -y && apt-get upgrade -y && \
    apt-get install -y postgresql-client && \
    apt-get install -y --no-install-recommends build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Setup virtual environment
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip

# Copy just the requirements.txt initially
COPY ./requirements.txt /requirements.txt

# Install Python dependencies
RUN /py/bin/pip install -r /requirements.txt

# No need to explicitly remove build dependencies as we're not using a virtual package like in Alpine

# Copy the rest of your application code after installing dependencies
COPY ./app /app
COPY ./scripts /scripts

# Adjust permissions and create necessary directories
RUN adduser --disabled-password --gecos '' user && \
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
