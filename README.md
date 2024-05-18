# README
# Patient Db with Hippa Regulations
This is a web application built with Node.js, React, and MongoDB. It is designed to be run with Docker Compose, with React being served by Nginx.
## Dependencies
- node 16.14.2
- mongodb
- SSl Certificates
## Getting Started
1. Docker deamon need to be installed
2. Run `docker compose up`
*(Make sure that port 3000 and 5000 is available on your machine)*
## React App (As default settings in docker-compose.yml)
`GET https://localhost:3000`

**Register a user to getting started.**
> A patient can login/signup and view all records related to them
>
> A doctor can login/signup and view all records
>
> A doctor can create an admission and edit and delete an admission
>
> Admin is allowed to perform all actions and view logs

**Default in docker `admin@gmail.com` is** seeded as admin user with password `Abc123@s`

***
*MongoDb provides default encryption of data in rest, where as for data in transit, ssl is enabled for secure data transfer*
