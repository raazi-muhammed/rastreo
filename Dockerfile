FROM node:alpine

WORKDIR /vite_app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]