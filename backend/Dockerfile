# Utiliser l'image officielle de Node.js 22 basée sur Alpine Linux
FROM node:22-alpine

# Définir le répertoire de travail de l'application dans le conteneur
WORKDIR /app

# Mettre à jour npm et ses dépendances intégrées
RUN npm install --global npm@latest

# Copier les fichiers de configuration npm (package.json et package-lock.json)
COPY package*.json ./

# Installer uniquement les dépendances nécessaires en production
RUN npm install --omit=dev

# Copier le fichier server et attribuer sa propriété à l'utilisateur node
COPY --chown=node:node server.js ./

# Exécuter l'application avec un utilisateur non privilégié (sécurité Trivy)
USER node

# Indiquer le port utilisé par l'application dans le conteneur
EXPOSE 3000

# Démarrer le serveur Node.js au lancement du conteneur
CMD ["node", "server.js"]
