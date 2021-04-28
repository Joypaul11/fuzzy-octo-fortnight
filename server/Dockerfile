FROM node:15-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
COPY . ./

USER root

RUN npm install --quiet


COPY --chown=node:node . .

ENV NODE_PORT 5000

EXPOSE 5000

CMD ["npm", "start"]