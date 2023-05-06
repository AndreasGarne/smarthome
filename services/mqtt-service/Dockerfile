FROM node:19-bullseye-slim as base

# Create app directory
WORKDIR /smarthome

# Install app dependencies
COPY package*.json ./
COPY shared shared
COPY services/mqtt-service services/mqtt-service

RUN npm run install-all
RUN npm run build-all

# FROM node:19-bullseye-slim

# # Create app directory
# WORKDIR /smarthome/shared/models
# COPY --from=base /smarthome/shared/models/package*.json ./
# COPY --from=base /smarthome/shared/models/build ./build
# WORKDIR /smarthome/shared/decorators
# COPY --from=base /smarthome/shared/decorators/package*.json ./
# COPY --from=base /smarthome/shared/decorators/build ./build
# WORKDIR /smarthome/services/mqtt-service
# COPY --from=base /smarthome/services/mqtt-service/package*.json ./
# COPY --from=base /smarthome/services/mqtt-service/build ./build

# WORKDIR /smarthome/
# COPY package*.json .
# RUN npm run install-all
# RUN npm run build

# COPY services/mqtt-service/run.js ./
# CMD [ "node", "run.js" ]
CMD [ "node", "services/mqtt-service/build/src/index.js" ]