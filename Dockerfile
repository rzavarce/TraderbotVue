
FROM node:16-alpine

FROM node:8-alpine
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*
# RUN npm install -g cordova quasar-cli
# RUN cordova --version

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY ./* /opt/projects/TraderbotVue/

RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli
RUN npm install


RUN quasar build
