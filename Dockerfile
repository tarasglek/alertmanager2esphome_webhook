# docker build -t alertmanager2esphome_webhook .
# docker run -ti -v  alertmanager2esphome_webhook
FROM node:10-stretch
COPY package.json .
RUN yarn install
COPY index.ts .
ENTRYPOINT []
EXPOSE 9000
CMD yarn run simple