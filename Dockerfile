FROM node:18.16.0

WORKDIR /app

COPY *.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]