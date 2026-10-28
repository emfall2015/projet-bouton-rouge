
# Utiliser Node.js 22 sur Alpine Linux
FROM node:22-alpine

WORKDIR /app

# Mettre à jour npm et ses dépendances intégrées
RUN npm install --global npm@latest

# Copier les fichiers de dépendances du backend
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --omit=dev

# Copier le serveur et attribuer les droits à l'utilisateur node
COPY --chown=node:node server.js ./

# Exécuter l'application sans privilèges root
USER node

EXPOSE 3000

CMD ["node", "server.js"]
