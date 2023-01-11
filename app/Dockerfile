FROM node:16-buster-slim as build-stage
WORKDIR /app

COPY /app/package.json ./
COPY /app/yarn.lock ./

RUN yarn install
COPY /app .

RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
