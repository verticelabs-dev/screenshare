FROM node:16-buster-slim

WORKDIR /relay-server

COPY ./relay-server/package.json ./
COPY ./relay-server/yarn.lock ./

RUN yarn --frozen-lockfile

COPY ./relay-server .
COPY ./relay-server/.env.example .env

RUN yarn build

EXPOSE 8989
CMD [ "node", "dist/app.js" ]
