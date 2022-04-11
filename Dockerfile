# Build stage
FROM node:latest as develop-stage

RUN mkdir -p /opt/projects/TraderbotVue/

WORKDIR /opt/projects/TraderbotVue/

COPY . /opt/projects/TraderbotVue/

RUN npm install

RUN npm install -g @quasar/cli

RUN quasar build

# Runtime stage
FROM nginx as production-stage
ENV projectName "TradingbotWebApp"
COPY --from=develop-stage /opt/projects/TraderbotVue/dist/spa/* /usr/share/nginx/html/
# COPY ./${projectName}/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8881

