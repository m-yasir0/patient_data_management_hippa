FROM node:16.14.2

RUN apt-get update -qq && apt-get install -y build-essential yarn

WORKDIR /app/backend
COPY . .
RUN yarn install

EXPOSE 5000
CMD [ "npm", "start" ]
