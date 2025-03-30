FROM node:alpine AS base

WORKDIR /app

COPY ../server/package*.json ./

RUN yarn

COPY ../server .

FROM base AS build
RUN yarn build api
RUN yarn build worker

FROM base AS development

CMD [""]

FROM node:alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN yarn --production

CMD [""]
