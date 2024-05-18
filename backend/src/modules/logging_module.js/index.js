import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { MongoDB } from 'winston-mongodb'

import dbConfig from '../../config/config.js'
const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

const mongoTransport = new MongoDB({
  db: config.database.url,
  collection: 'logs',
  options: { useUnifiedTopology: true },
  metaKey: 'meta',
  meta: { user_id: 'user_id' },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new DailyRotateFile({
      filename: 'logs/user-activity-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      dirname: './logs',
    }),
    mongoTransport,
  ],
})
