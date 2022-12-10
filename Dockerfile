FROM node:16
WORKDIR /app

COPY . .

RUN npm install

ENV HOST 0.0.0.0
EXPOSE 3000

RUN [ "npm", "run", "build" ]
CMD [ "npm", "run", "start" ]
