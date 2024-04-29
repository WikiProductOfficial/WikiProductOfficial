FROM python:3.9
LABEL maintainer="backend-server"

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y postgresql-client build-essential libpq-dev && \
    apt-get install git-lfs && \
    python -m venv /py && \
    /py/bin/pip install --upgrade pip

COPY ./requirements.txt /requirements.txt

RUN /py/bin/pip install -r /requirements.txt

COPY ./app /app
COPY ./scripts /scripts

RUN adduser --disabled-password --no-create-home user && \
    mkdir -p /vol/web/static && \
    chown -R user:user /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

EXPOSE 8000

# TODO: Uncomment this for deployment
# USER user

CMD ["run.sh"]
