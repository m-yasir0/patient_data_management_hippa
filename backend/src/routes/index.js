import express from 'express'
import { admissionRoutesApi } from './admission_routes.js'
import { userRoutesApi } from './user_routes.js'
import { authenticator } from '../middlewares/authentication_middleware.js'
import { logsRoutesApi } from './logs_routes.js'

class MainRouter {
  constructor() {
    this.router = express.Router()
    this.routes()
  }
  routes() {
    this.router.use('/user', userRoutesApi)
    this.router.use('/admission', authenticator, admissionRoutesApi)
    this.router.use('/logs', authenticator, logsRoutesApi)
  }
}
//Export MainApi to use in main index file
export default new MainRouter().router
