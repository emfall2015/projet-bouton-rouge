# Étape 1 : Construire l'application frontend avec Node.js
FROM node:22-alpine AS build

# Définir le répertoire de travail pour la compilation
WORKDIR /app

# Copier les fichiers de dépendances npm
COPY package*.json ./

# Installer les dépendances nécessaires à la compilation
RUN npm install

# Copier le code source du frontend dans le conteneur
COPY . .

# Compiler l'application frontend pour la production
RUN npm run build

# Étape 2 : Servir les fichiers compilés avec Nginx
FROM nginx:alpine

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers compilés depuis l'étape de build
COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# Donner à Nginx les permissions nécessaires pour lire les fichiers du frontend
RUN chown -R nginx:nginx /usr/share/nginx/html

# Indiquer le port HTTP utilisé par le serveur web
EXPOSE 80

# Exécuter Nginx avec un utilisateur non privilégié
USER nginx
