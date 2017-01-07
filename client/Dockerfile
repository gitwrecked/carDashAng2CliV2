FROM node:6

RUN mkdir -p /carDash/client

WORKDIR /carDash/client

COPY package.json /carDash/client

RUN npm install

COPY . /carDash/client

EXPOSE 4200

CMD ["npm", "start"]