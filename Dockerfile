FROM node:16.14.2-alpine3.15
WORKDIR /buchi
COPY package*.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]