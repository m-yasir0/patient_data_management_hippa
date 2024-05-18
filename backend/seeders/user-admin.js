import Users from '../src/models/user.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import config from '../src/config/config.js'

dotenv.config()
const env = process.env.NODE_ENV || 'development'
//connect mongoose
mongoose
  .connect(config[env].database.url, config[env].database.options)
  .catch((err) => {
    console.log(err.stack)
    process.exit(1)
  })
  .then(() => {
    console.log('connected to db environment')
  })

Users(mongoose)
  .create({
    role: 'admin',
    password: 'Abc123@s',
    user_email: 'admin@gmail.com',
  })
  .then((res) => {
    console.log('User Created')
    mongoose.connection.close()
  })
  .catch(() => {
    mongoose.connection.close()
  })
