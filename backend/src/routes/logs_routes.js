import express from 'express'
import { LogsController } from '../controllers/logs_controller.js'

class LogsRoutes {
  constructor() {
    this.router = express.Router()
    this.routes()
  }

  routes() {
    this.router.get('/', async (req, res, next) => {
      try {
        const logs = await new LogsController(req.user).listLogs()
        res.json({ logs })
        next()
      } catch (error) {
        next(error)
      }
    })
  }
}

export const logsRoutesApi = new LogsRoutes().router
