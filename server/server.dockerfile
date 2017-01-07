# Build: 
# docker build -f server.dockerfile -t gitwrecked/cardashang2cliv2_server:latest .

# Run:
# docker run -d -p 4200:4200 --name gitwrecked/cardashang2cliv2_server gitwrecked/cardashang2cliv2_server:latest

FROM node:6

MAINTAINER GitWrecked

ENV NODE_ENV=production
ENV PORT=3001
ENV MONGO_URI=mongodb://database/test

RUN npm install pm2 -g

RUN mkdir -p /carDash/server

WORKDIR /carDash/server

COPY package.json /carDash/server

RUN npm install

COPY . /carDash/server

EXPOSE $PORT 

ENTRYPOINT ["pm2-docker", "server.js"]