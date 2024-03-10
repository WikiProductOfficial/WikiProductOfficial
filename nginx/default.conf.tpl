server {
    listen ${LISTEN_PORT};

    root /usr/share/nginx/html/browser/;
    index index.html;

    location / {
        # try_files /index.html =404;
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
