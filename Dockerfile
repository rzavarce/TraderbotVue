
FROM node:latest

RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update git && rm -rf /tmp/* /var/cache/apk/*

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY ./* /opt/projects/TraderbotVue/

RUN npm install
# RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli

# RUN quasar build
RUN quasar dev
