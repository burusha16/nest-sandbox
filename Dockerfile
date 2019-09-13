FROM node:10.16.0-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app
RUN npm install
COPY . /usr/app
EXPOSE 3000
