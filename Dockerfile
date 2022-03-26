FROM node:16-alpine
WORKDIR /buchi
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 5000
CMD [ "npm", "start" ]
