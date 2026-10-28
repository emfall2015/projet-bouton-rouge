# Étape 1 : Construire l'application frontend avec Node.js
# FROM node:22-alpine AS build

# Définir le répertoire de travail pour la compilation
# WORKDIR /app

# # Copier les fichiers de dépendances npm
# COPY package*.json ./

# Installer les dépendances nécessaires à la compilation
# RUN npm install

# # Copier le code source du frontend dans le conteneur
# COPY . .

# Compiler l'application frontend pour la production
# RUN npm run build

# # Étape 2 : Servir les fichiers compilés avec Nginx
# FROM nginx:alpine

# # Copier la configuration Nginx personnalisée
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copier les fichiers compilés depuis l'étape de build
# COPY --from=build /app/dist/le-bouton-rouge-frontend/browser /usr/share/nginx/html

# # Donner à Nginx les permissions nécessaires pour lire les fichiers du frontend
# RUN chown -R nginx:nginx /usr/share/nginx/html

# # Indiquer le port HTTP utilisé par le serveur web
# EXPOSE 80

# # Exécuter Nginx avec un utilisateur non privilégié
# USER nginx

# syntax=docker/dockerfile:1

# ============================================================
# BUILD
# ============================================================

FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG ENV=production

RUN case "$ENV" in \
      production|preprod) ;; \
      *) echo "Unsupported Angular environment: $ENV" >&2; exit 1 ;; \
    esac \
    && npm run ng -- build --configuration="$ENV"


# ============================================================
# RUNTIME
# ============================================================

FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

USER root
RUN apk upgrade --no-cache libexpat
USER 101

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder \
    --chown=101:0 \
    /app/dist/angular-starter/browser \
    /usr/share/nginx/html


USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
 