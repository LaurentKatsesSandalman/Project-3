
 # Image de base
FROM node:22.14-alpine

# Répertoire de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000


# Commande de démarrage en mode développement
CMD ["npm", "run", "dev"]