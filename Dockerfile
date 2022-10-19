# 1. Install dependencies and build next app
FROM node:16.16.0 as BUILD_IMAGE

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN apt update && apt-get install -y libudev-dev && apt-get install libusb-1.0-0
RUN yarn --no-progress --non-interactive --frozen-lockfile

COPY . .

RUN yarn build

# 2. Production image, copy all required files and run next

FROM node:16.18-alpine3.16 AS runner

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app /app

EXPOSE 3000

CMD ["/app/node_modules/next/dist/bin/next", "start"]