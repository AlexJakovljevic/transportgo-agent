FROM node:alpine

RUN mkdir client-app

WORKDIR /client-app 

COPY package.json /client-app/package.json

RUN npm i

COPY . /client-app

RUN npm run build

CMD ["npm", "start"]