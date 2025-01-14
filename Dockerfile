FROM node:22-alpine

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build
RUN npm i -g serve

CMD [ "serve", "-s", "dist" ]