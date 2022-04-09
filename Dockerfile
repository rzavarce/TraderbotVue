
FROM node:latest

RUN mkdir -p /opt/projects/TraderbotVue/

COPY ./* /opt/projects/TraderbotVue/

RUN npm install
# RUN npm install -g npm@8.6.0
# RUN npm install -g @vue/cli
# RUN npm install -g @quasar/cli

WORKDIR /opt/projects/TraderbotVue/

RUN pwd

# RUN quasar build
RUN quasar dev
