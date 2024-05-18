import express from 'express'
import { AdmissionController } from '../controllers/admission_controller.js'
import { logger } from '../modules/logging_module.js/index.js'

class AdmissionRoutes {
  constructor() {
    this.router = express.Router()
    this.routes()
  }

  routes() {
    this.router.post('/create', async (req, res, next) => {
      try {
        const admission = await new AdmissionController(req.user).create(
          req.body,
        )
        res.send('Admission created!')
        req.payload = admission
        next()
      } catch (error) {
        next(error)
      }
    })

    this.router.put('/:id/update', async (req, res, next) => {
      try {
        const admission = await new AdmissionController(req.user).update(
          req.params.id,
          req.body,
        )
        res.send('Admission updated!')
        req.payload = admission
        next()
      } catch (error) {
        next(error)
      }
    })
    this.router.delete('/:id/delete', async (req, res, next) => {
      try {
        const admission = await new AdmissionController(req.user).delete(
          req.params.id,
        )
        res.send('Admission deleted!')
        req.payload = admission
        next()
      } catch (error) {
        next(error)
      }
    })
    this.router.get('/:id/show', async (req, res, next) => {
      try {
        const admission = await new AdmissionController(req.user).show(
          req.params.id,
        )
        res.json({ admission })
        req.payload = admission
        next()
      } catch (error) {
        next(error)
      }
    })
    this.router.get('/list', async (req, res, next) => {
      try {
        const admissions = await new AdmissionController(req.user).list()
        res.json({ admissions })
        next()
      } catch (error) {
        next(error)
      }
    })
  }
}

export const admissionRoutesApi = new AdmissionRoutes().router
