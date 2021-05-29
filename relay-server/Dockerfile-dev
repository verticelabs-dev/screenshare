FROM node:10

WORKDIR /relay-server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8989

CMD ["npm", "run", "dev"]