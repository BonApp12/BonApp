# pull base image
FROM node:16-buster-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 (tests) for debug
ARG PORT=$REACT_NATIVE_PORT_DEFAULT
ENV PORT $PORT
EXPOSE $PORT $REACT_NATIVE_PORT_DEBUG_1 $REACT_NATIVE_PORT_DEBUG_2

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.yarn-global
ENV PATH /home/node/.yarn-global/bin:$PATH
RUN yarn global add expo-cli@latest

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir /opt/mobile && chown -R 755 /opt/mobile
WORKDIR /opt/mobile
ENV PATH /opt/mobile/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn install

# copy in our source code last, as it changes the most
WORKDIR /opt/mobile/app
# for development, we bind mount volumes; comment out for production
COPY . .

ENTRYPOINT ["yarn", "run"]
CMD ["web"]