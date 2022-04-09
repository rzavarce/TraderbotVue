
FROM node:latest

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY . /opt/projects/TraderbotVue/

RUN npm install

RUN npm install -g @quasar/cli

# RUN quasar build
# RUN quasar dev
