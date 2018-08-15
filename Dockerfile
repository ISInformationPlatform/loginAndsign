FROM node:8.1.1

ADD . /app
WORKDIR /app

RUN yarn

EXPOSE 8080

CMD ["yarn","start"]
