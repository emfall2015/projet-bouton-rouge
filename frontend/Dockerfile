# Étape 1 : Construire le frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Servir le frontend avec Nginx
FROM nginx:alpine

RUN apk upgrade --no-cache \
    && mkdir -p /tmp/nginx/client_temp \
                /tmp/nginx/proxy_temp \
                /tmp/nginx/fastcgi_temp \
                /tmp/nginx/uwsgi_temp \
                /tmp/nginx/scgi_temp \
    && chown -R nginx:nginx /tmp/nginx

# Configuration principale de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Configuration du serveur existante
COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]
