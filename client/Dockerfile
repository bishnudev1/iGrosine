FROM node

WORKDIR /client

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . .

ENTRYPOINT [ "npm","start" ]