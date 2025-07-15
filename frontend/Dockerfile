FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Utilise "serve" pour servir les fichiers React
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
