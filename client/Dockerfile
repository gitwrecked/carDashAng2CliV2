FROM node:6

RUN mkdir -p /client

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

EXPOSE 4200

CMD ["npm", "start"]