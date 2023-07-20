# Stage 1: Install node modules
FROM docker.io/node:lts as npm-install

WORKDIR /app
COPY ./package*.json /app/
RUN npm install

# Stage 2: Build Project
FROM node:lts as build

WORKDIR /app
COPY --from=npm-install /app/node_modules /app/node_modules
COPY ./ /app/
RUN npm run ng build --no-progress --configuration=production

# Stage 3: Serve app with nginx
FROM docker.io/nginx:1.25.2-alpine

RUN apk update && apk add jq --no-cache

COPY --from=build /app/dist/edc-demo-client /usr/share/nginx/html
COPY --from=build /app/src/assets /usr/share/nginx/html/assets
COPY docker/default.conf.template etc/nginx/conf.d/default.conf.template

ENV NGINX_BIND=""
ENV NGINX_PORT=8080

HEALTHCHECK --interval=2s --timeout=5s --retries=10 \
  CMD curl -f http://${NGINX_BIND:"localhost"}:$NGINX_PORT/ || exit 1

# Change nginx setup for nonroot
RUN sed -i -e 's|/var/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  && chown -R nginx:nginx \
  /etc/nginx \
  /var/cache/nginx \
  /usr/share/nginx/html/assets/config

# Before starting nginx, apply ENV vars:
# (1) Apply NGINX_BIND and NGINX_PORT to nginx.conf
# (2) Create app-config.json from EDC_UI_* ENV Vars
CMD NGINX_LISTEN=${NGINX_BIND:+${NGINX_BIND}:}${NGINX_PORT} envsubst '${NGINX_LISTEN}' </etc/nginx/conf.d/default.conf.template >/etc/nginx/conf.d/default.conf \
  && jq -n 'env | with_entries( select(.key | startswith("EDC_UI_") ) )' > /usr/share/nginx/html/assets/config/app-config.json \
  && nginx -g "daemon off;"
