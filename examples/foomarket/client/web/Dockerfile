FROM node:16 as node
WORKDIR /app


FROM node as develop
EXPOSE 3000
CMD npm link /packages/npm-refine-laravel-orion/ /packages/npm-refine-keycloak/ \
    && npm run dev


FROM node as build
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps
COPY . .
HEALTHCHECK --start-period=60s --interval=3s --timeout=3s --retries=8 CMD curl --fail http://localhost:3000 || exit 1
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN echo $'server {                           \n\
    listen       80;                          \n\
    listen  [::]:80;                          \n\
    server_name  localhost;                   \n\
    location / {                              \n\
        root   /usr/share/nginx/html;         \n\
        index  index.html index.htm;          \n\
        try_files $uri /index.html;           \n\
    }                                         \n\
    error_page   500 502 503 504  /50x.html;  \n\
    location = /50x.html {                    \n\
        root   /usr/share/nginx/html;         \n\
    }                                         \n\
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
