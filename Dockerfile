FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig*.json .
RUN npm install
COPY src src
RUN npm run build

FROM node:lts-alpine
ENV PORT 3000
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json .
RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE $PORT
ENTRYPOINT [ "/sbin/tini", "--", "npm", "start" ]
