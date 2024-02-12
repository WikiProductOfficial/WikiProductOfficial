#!/bin/sh

set -e

ls -la /vol/
ls -la /vol/web

whoami

python manage.py wait_for_db
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py createsu

uwsgi --socket :8000 --workers 4 --master --enable-threads --module app.wsgi