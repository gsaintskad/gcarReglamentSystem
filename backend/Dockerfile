
FROM node:24-alpine 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "npx knex --knexfile knexfile.ts migrate:latest --debug && npm run start:prod"]