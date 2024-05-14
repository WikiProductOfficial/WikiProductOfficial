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
if [ ! -f "../app/scripts/clean_warehouse.pkl" ]; then
    wget "$DOWNLOAD_URL" -O "../app/scripts/clean_warehouse.pkl"
elif [ "$PKL_UPDATED" = "true" ]; then
    wget "$DOWNLOAD_URL" -O "../app/scripts/clean_warehouse.pkl"
fi

if [ "$LOAD_PG" = "true" ]; then
    python manage.py runscript load_pg --script-args "$LOAD_START" "$LOAD_END"
fi

if [ "$LOAD_CHROMA" = "true" ]; then
    python manage.py runscript load_chroma --script-args "$LOAD_START" "$LOAD_END"
fi

uwsgi --socket :8000 --workers 4 --master --enable-threads -b 32768 --module app.wsgi
