FROM node:alpine

WORKDIR /monitor_eth
ADD . .

RUN npm install

CMD ["node", "index.js"]
