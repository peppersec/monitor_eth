FROM node:11
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --no-cache
COPY . .
HEALTHCHECK CMD ["npm", "run", "healthcheck"]
CMD ["npm", "run", "start"]