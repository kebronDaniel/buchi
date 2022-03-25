FROM node:latest
WORKDIR /buchi
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]