import fs from 'fs'
import path from 'path'
import Mongoose from 'mongoose'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const basename = path.basename(new URL(import.meta.url).pathname)
const env = process.env.NODE_ENV || 'development'
import dbConfig from '../config/config.js'

const config = dbConfig[env]
if (config.database.url) {
  Mongoose.connect(config.database.url, config.database.options)
} else if (config.database.config.dbName) {
  Mongoose.connect(
    `${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`,
    config.database.options,
  )
} else {
  Mongoose.connect(
    `${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
    config.database.options,
  )
}

function db() {
  const m = {}
  const __dirname = path.dirname(new URL(import.meta.url).pathname)
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      )
    })
    .forEach(async (file) => {
      let { default: model } = await import(path.resolve(__dirname, file))
      model = model(Mongoose)
      m[model.modelName] = model
    })

  return m
}

export default db()
export const mongoose = Mongoose
