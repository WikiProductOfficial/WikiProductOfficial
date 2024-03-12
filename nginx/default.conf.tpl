server {
    listen ${LISTEN_PORT};
    root /usr/share/nginx/html/browser;
    index index.html;

    root /usr/share/nginx/html/browser/;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static {
        alias /vol/static;
    }

    location /api {
        uwsgi_pass ${APP_HOST}:${APP_PORT};
        include /etc/nginx/uwsgi_params;
    }
}
