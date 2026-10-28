# Étape 1 : Construire l'application frontend
# FROM node:22-alpine AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# # Étape 2 : Servir les fichiers avec Nginx
# FROM nginx:alpine

# # Mettre à jour les paquets système Alpine
# RUN apk upgrade --no-cache

# # Copier la configuration Nginx personnalisée
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copier les fichiers compilés
# COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# # Donner les permissions de lecture à Nginx
# RUN chown -R nginx:nginx /usr/share/nginx/html

# EXPOSE 80

# USER nginx


# Étape 1 : Construire l'application frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés
COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# Préparer les répertoires nécessaires à Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid

# Utiliser un port non privilégié et un répertoire temporaire accessible
RUN sed -i 's/listen 80;/listen 8080;/' /etc/nginx/conf.d/default.conf \
    && mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp \
       /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp \
    && chown -R nginx:nginx /tmp/nginx

# Indiquer le port utilisé par Nginx
EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]