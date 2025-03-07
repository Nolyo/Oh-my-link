FROM node:20-alpine AS build

WORKDIR /app

# Installation des dépendances
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copie des fichiers du projet
COPY . .

# Build de l'application
RUN pnpm build

# Étape de production avec Nginx
FROM nginx:alpine

# Copie des fichiers de build depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Copie de la configuration Nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port (à ajuster dans docker-compose)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
