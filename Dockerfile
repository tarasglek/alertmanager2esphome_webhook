# docker build -t alertmanager2esphome_webhook .
# docker run -ti -p 9000:9000  alertmanager2esphome_webhook
FROM node:10-stretch
COPY package.json .
RUN yarn install
COPY index.ts .
ENTRYPOINT []
EXPOSE 9000
CMD yarn run simple
