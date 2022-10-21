FROM node:16.18-alpine3.16

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN apk update && apk add --no-cache bash git 

RUN yarn --no-progress --non-interactive --frozen-lockfile

COPY . .

RUN yarn build