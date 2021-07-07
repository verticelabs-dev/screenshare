FROM node:10

WORKDIR /relay-server

COPY ./relay-server/package*.json ./

RUN npm install

COPY ./relay-server .
COPY ./relay-server/.env.example .env

ADD ./relay-server/start_prod.sh /
RUN chmod +x /start_prod.sh

EXPOSE 8989

CMD ["/start_prod.sh"]