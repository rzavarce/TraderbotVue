# Build stage
FROM node:latest

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY . /opt/projects/TraderbotVue/

RUN npm install

RUN npm install -g @quasar/cli

RUN quasar build

RUN cp /opt/projects/TraderbotVue/dist/spa/*

# Runtime stage
FROM nginx
ENV projectName "TradingbotWebApp"
COPY --from=buildenv opt/projects/TraderbotVue/dist/spa-mat /usr/share/nginx/html
COPY ./${projectName}/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

