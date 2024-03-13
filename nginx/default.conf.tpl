# Configuration for the server
server {
    listen __LISTEN_PORT__;

    location / {
        root /usr/share/nginx/html/browser;
        index index.html;
        expires -1;
        add_header Pragma "no-cache";
        add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
        try_files $uri$args $uri$args/ $uri $uri/ /index.html =404;
    }

    location /static {
        alias /vol/static;
        expires 30d;
        access_log off;
    }

    location /api {
        uwsgi_pass __APP_HOST__:__APP_PORT__;
        include /etc/nginx/uwsgi_params;
    }
}
