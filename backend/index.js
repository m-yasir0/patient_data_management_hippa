// Imports and packages

import express from 'express'
const app = express()

import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import https from 'https'
dotenv.config()
import MainRouter from './src/routes/index.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { mongoose } from './src/models/index.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { logger_middleware } from './src/middlewares/logger_middleware.js'
import { error_handler_middleware } from './src/middlewares/error_hander_middleware.js'

// End imports

const env = process.env
function initApplication() {
  app.use(
    cors({
      origin: process.env.CLIENT_APP_URL,
      credentials: true,
    }),
  )
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser(env.TOKEN_KEY))

  var accessLogStream = fs.createWriteStream(
    path.join(path.dirname(new URL(import.meta.url).pathname), 'access.log'),
    { flags: 'a' },
  )
  app.use(morgan('combined', { stream: accessLogStream }))

  // Use index router
  app.use(MainRouter)

  // Custom Logger middleware
  app.use(logger_middleware)

  // Error handling middleware
  app.use(error_handler_middleware)

  return mongoose
}

function start() {
  const options = {
    key: fs.readFileSync('./certificates/server.key'),
    cert: fs.readFileSync('./certificates/server.crt'),
  }
  initApplication()
    .connection.on('connected', () => {
      const PORT = env.PORT || 5000
      const server = https.createServer(options, app)
      server.listen(PORT, () => {
        console.log(`Server started on PORT:` + PORT)
      })
    })
    .on('error', (error) => {
      console.log('Unable to connect to the database server')
      console.log(error)
      throw error
    })
}

start()
