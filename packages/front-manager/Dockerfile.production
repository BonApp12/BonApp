# Stage 1
FROM node:14 as build-stage

WORKDIR /front-manager
COPY package.json .
RUN yarn
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN yarn build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /front-manager/build /usr/share/nginx/html
COPY /nginx/conf/default.conf /etc/nginx/conf.d/default.conf
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'

