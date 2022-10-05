FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ARG API_URL="http://localhost:80"
RUN echo "VUE_APP_BASE_URL=${API_URL}" > .env
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN echo "server { listen 80; listen [::]:80; server_name localhost; location / { root /usr/share/nginx/html; index index.html index.htm; try_files \$uri \$uri/ /index.html; } }" \
    > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
