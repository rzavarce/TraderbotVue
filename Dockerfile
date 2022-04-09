
FROM node:latest

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY . /opt/projects/TraderbotVue/


RUN ls -la

RUN cat quasar.conf.js


RUN npm install
# RUN npm install -g npm@8.6.0
# RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli


RUN quasar build
# RUN quasar dev
