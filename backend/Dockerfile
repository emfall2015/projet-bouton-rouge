# FROM node:22-alpine

# WORKDIR /app

# # Mettre à jour npm pour corriger les vulnérabilités de ses dépendances
# RUN npm install --global npm@latest

# # Installer les dépendances de production
# COPY package*.json ./
# RUN npm install --omit=dev

# # Copier le serveur
# COPY --chown=node:node server.js ./

# # Utiliser un utilisateur non privilégié
# USER node

# EXPOSE 3000

# CMD ["node", "server.js"]


FROM node:22-alpine

WORKDIR /app

# Mettre à jour npm
RUN npm install --global npm@latest

# Corriger la dépendance undici intégrée à npm
RUN npm install --prefix "$(npm root -g)/npm" undici@6.29.1 --save-exact

# Installer les dépendances de production du backend
COPY package*.json ./
RUN npm install --omit=dev

# Copier le serveur
COPY --chown=node:node server.js ./

# Utiliser un utilisateur non privilégié
USER node

EXPOSE 3000

CMD ["node", "server.js"]
