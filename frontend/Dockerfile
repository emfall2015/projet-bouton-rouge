# Étape 1 : Construire l'application frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:alpine

# Mettre à jour les paquets système
RUN apk upgrade --no-cache

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés
COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# Préparer les répertoires nécessaires à Nginx
RUN mkdir -p /tmp/nginx/client_temp \
             /tmp/nginx/proxy_temp \
             /tmp/nginx/fastcgi_temp \
             /tmp/nginx/uwsgi_temp \
             /tmp/nginx/scgi_temp \
    && chown -R nginx:nginx /usr/share/nginx/html /tmp/nginx \
    && touch /tmp/nginx.pid \
    && chown nginx:nginx /tmp/nginx.pid

# Utiliser des chemins temporaires accessibles à nginx
RUN printf '\nclient_body_temp_path /tmp/nginx/client_temp;\nproxy_temp_path /tmp/nginx/proxy_temp;\nfastcgi_temp_path /tmp/nginx/fastcgi_temp;\nuwsgi_temp_path /tmp/nginx/uwsgi_temp;\nscgi_temp_path /tmp/nginx/scgi_temp;\npid /tmp/nginx.pid;\n' > /etc/nginx/conf.d/zz-temp-paths.conf

EXPOSE 80

USER nginx

CMD ["nginx", "-g", "daemon off;"]