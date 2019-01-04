FROM node:10.15.0

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

EXPOSE 8080
ENTRYPOINT [ "npm", "run", "deploy" ]