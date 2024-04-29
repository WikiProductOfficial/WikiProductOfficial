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
wget "https://www.dropbox.com/scl/fi/ej5650b6vktwhlx8tq31y/clean_warehouse.pkl?rlkey=5xc03h176lcg8nz9j15z84p4a&st=2gqj4xmd&dl=0" -O "../app/scripts/clean_warehouse.pkl"
python manage.py runscript load --script-args "$LOAD_START" "$LOAD_END"

uwsgi --socket :8000 --workers 4 --master --enable-threads -b 32768 --module app.wsgi
