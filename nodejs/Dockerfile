FROM node:18-alpine

WORKDIR /usr/app/src

ENV DOCKERIZE_VERSION v0.7.0
RUN apk update --no-cache \
  && apk add --no-cache wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
  && apk del wget

COPY . .

RUN npm i

CMD ["npm", "run", "dev"]