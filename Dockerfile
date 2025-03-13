FROM node:lts-alpine AS builder
WORKDIR /ton-proxy-frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-ssg

FROM nginx:stable-alpine as production
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ton-proxy-frontend/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html

COPY entrypoint.sh ./
RUN ["mv", "./entrypoint.sh", "/docker-entrypoint.d/40-envsubst-entrypoint.sh"]
RUN chmod 775 "/docker-entrypoint.d/40-envsubst-entrypoint.sh"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
