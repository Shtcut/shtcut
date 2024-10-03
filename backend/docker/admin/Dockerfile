## Stage 1. Compiles the service
FROM node:18-alpine AS builder

## Set build directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY backend/package*.json ./
COPY backend/tsconfig.json backend/tsconfig.build.json backend/nest-cli.json ./

#Install dev dependencies
RUN yarn install --frozen-lockfile --dev --verbose

# Copy sources
COPY backend/apps/sht-admin ./apps/sht-acl
COPY backend/config ./config
COPY backend/libs ./libs

# Buld app
RUN yarn run build:admin

## Stag 2. Run built app
# Note: node:12-alpine could not be used here due to weak bcrypt support:
# https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images
FROM node:18-alpine

# Set app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY backend/package.json ./
RUN yarn install --frozen-lockfile --production
COPY --from=builder /usr/src/app/dist/apps/sht-admin ./dist

# Export port for use
EXPOSE 7000

CMD [ "node", "dist/main" ]