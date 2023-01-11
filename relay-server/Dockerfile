FROM node:16-buster-slim

WORKDIR /relay-server

COPY ./relay-server/package*.json ./

RUN npm install

COPY ./relay-server .
COPY ./relay-server/.env.example .env

EXPOSE 8989

CMD ["/start_prod.sh"]