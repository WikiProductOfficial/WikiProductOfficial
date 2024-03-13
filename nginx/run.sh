#!/bin/sh

set -e

sed -e "s|__LISTEN_PORT__|${LISTEN_PORT}|g" \
    -e "s|__APP_HOST__|${APP_HOST}|g" \
    -e "s|__APP_PORT__|${APP_PORT}|g" \
    /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'