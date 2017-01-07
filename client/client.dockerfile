# Build: 
# docker build -f client.dockerfile -t gitwrecked/cardashang2cliv2_client:latest .

# Run:
# docker run -d -p 4200:4200 --name gitwrecked/cardashang2cliv2_client gitwrecked/cardashang2cliv2_client:latest

FROM node:6

MAINTAINER GitWrecked

RUN mkdir -p /carDash/client

WORKDIR /carDash/client

COPY package.json /carDash/client

RUN npm install

COPY . /carDash/client

EXPOSE 4200

ENTRYPOINT ["npm", "start"]