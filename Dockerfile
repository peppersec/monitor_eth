FROM node:10

WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app

HEALTHCHECK CMD ["npm", "run", "healthcheck"]
CMD ["npm", "run", "start"]