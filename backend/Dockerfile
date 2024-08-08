FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY tsconfig.json /app/

COPY src/ app/src/

RUN npm run build

EXPOSE 4001

CMD ["npm", "run", "start"]