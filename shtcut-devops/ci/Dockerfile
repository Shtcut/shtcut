# FROM --platform=linux/amd64 node:16
FROM node:16

# Create app directory
WORKDIR /app

COPY package*.jsib ./
COPY yarn.lock ./

COPY ./ci/app.js ./

# Install app dependencies
RUN yarn install

EXPOSE 7000
CMD [ "node", "app.js" ]