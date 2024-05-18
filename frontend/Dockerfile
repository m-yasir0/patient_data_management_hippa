FROM node:16.14.2 as builder

RUN apt-get update -qq && apt-get install -y build-essential npm

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/frontend/build /usr/share/nginx/html
COPY certificates /etc/ssl/certs
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
