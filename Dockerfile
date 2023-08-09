FROM node:18.16.0-alpine3.18 As production

WORKDIR /app

COPY *.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD ["npm", "run", "start"]