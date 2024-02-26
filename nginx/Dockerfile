FROM node:20.11-alpine3.19 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install -g @angular/cli && npm install

COPY ../frontend/. .

RUN ng build --configuration=production

FROM nginxinc/nginx-unprivileged:1-alpine
LABEL maintainer="nginx-server"

COPY --from=frontend-build /frontend/dist/wiki-product /usr/share/nginx/html
COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./run.sh /run.sh

ENV LISTEN_PORT=8080
ENV APP_HOST=backend
ENV APP_PORT=8000  

USER root

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod +x /run.sh

# VOLUME /vol/static

USER nginx

EXPOSE 8080

CMD ["/run.sh"]
