FROM node:18-alpine As development

RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./

COPY . ./

RUN yarn 

RUN yarn build

RUN yarn --only=production && yarn cache clean --force

ENV PORT=3000
ENV NODE_ENV=production

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "entrypoint.sh"]
