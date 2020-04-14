FROM node:alpine
WORKDIR /radio
COPY package.json /radio
RUN npm install
COPY . /radio
CMD ["npm", "start"]