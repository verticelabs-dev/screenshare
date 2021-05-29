FROM node:10

WORKDIR /relay-server

COPY ./relay-server/package*.json ./

RUN npm install

COPY ./relay-server .

EXPOSE 8989

CMD ["npm", "run", "dev"]