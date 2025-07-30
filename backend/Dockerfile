
FROM node:24-alpine 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npm run migrate:latest && npm run start:prod"]