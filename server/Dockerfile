FROM node:6

RUN mkdir -p /carDash/server

WORKDIR /carDash/server

COPY package.json /carDash/server

RUN npm install

COPY . /carDash/server

EXPOSE 3001 

CMD ["npm", "start"]