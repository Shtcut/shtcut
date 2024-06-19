## Stage 1. Compile TS souces to JS
FROM node:16-alpine as builder

# Set build directory
WORKDIR /user/src/app

# Copy application dependency manifests to the container image.
# A wilcard is used to ensure both package.json AND package-lock.json are copied
# Copying this separately prevents re-running npm install on every code change.
COPY ./package*.json  ./*.lock ./tsconfig.cjson  ./tsconfig.build.json ./nest-cli.json ./

#Install dev dependencies
RUN yarn install  --frozen-lockfile --dev

# Copy Sources
COPY ./app/sht-acl ./apps/sht-acl
COPY ./config ./config
COPY ./libs ./libs

#Build app
RUN yarn run build:acl

## Stage 2. Run build app
# Note: node-12-alphine could not be used here due to weak bcrypt support:
# https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images
FROM node:16-alpine

# Set app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN yarn install --fronzen-lockfile --production
COPY --from=builder /usr/src/app/dist/apps/sht-acl ./dist

# Expose port for use
EXPOSE 7000

CMD [ "node", "dist/main" ]