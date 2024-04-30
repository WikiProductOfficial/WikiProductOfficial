#!/bin/sh

set -e

ls -la /vol/
ls -la /vol/web

whoami

sleep 5
python manage.py wait_for_db
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
python manage.py createsu
wget -nc "$DOWNLOAD_URL" -O "../app/scripts/clean_warehouse.pkl"
# python manage.py runscript load --script-args "$LOAD_START" "$LOAD_END"

uwsgi --socket :8000 --workers 4 --master --enable-threads -b 32768 --module app.wsgi
