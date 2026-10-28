# Étape 1 : Construire l'application frontend
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:alpine

# Mettre à jour les paquets système Alpine
RUN apk upgrade --no-cache

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés
COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# Donner les permissions de lecture à Nginx
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

USER nginx