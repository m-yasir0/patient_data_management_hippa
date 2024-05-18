import dotenv from 'dotenv'
dotenv.config()

const env = process.env
export default {
  development: {
    database: {
      url: `mongodb://localhost:${env.DB_PORT}/${env.DB_NAME}`,
      options: {
        useNewUrlParser: true,
      },
    },
  },
  test: {
    database: {
      url: 'mongodb://localhost/mongoose_test',
      options: {
        useNewUrlParser: true,
      },
    },
  },
  production: {
    database: {
      url: `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}?retryWrites=true&w=majority`,
      protocol: env.DB_HOST,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
      host: env.DB_HOST,
      port: '',
      options: {
        useNewUrlParser: true,
      },
    },
  },
}
