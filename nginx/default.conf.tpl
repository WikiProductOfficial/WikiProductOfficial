server {
    listen ${LISTEN_PORT};

    location / {
        root /usr/share/nginx/html/browser/;
    }

    location /static {
        root /vol/static;
    }

    location /api {
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }
}