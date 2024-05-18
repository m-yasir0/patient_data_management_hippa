import express from 'express'
import { UserController } from '../controllers/user_controller.js'
import { SEVEN_DAYS_IN_MILLISECOND } from '../utilities/app_constants.js'
import { authenticator } from '../middlewares/authentication_middleware.js'

class UserRoutes {
  constructor() {
    this.router = express.Router()
    this.routes()
  }

  routes() {
    this.router.post('/register', async (req, res, next) => {
      try {
        const { token, user } = await new UserController().registerUser(
          req.body,
        )
        setTokenCookie(res, token)
        res.json({ user })
        next()
      } catch (error) {
        next(error)
      }
    })

    this.router.post('/signin', async (req, res, next) => {
      try {
        const { token, user } = await new UserController().getUserToken(
          req.body,
        )
        setTokenCookie(res, token)
        res.json({ user })
        next()
      } catch (error) {
        next(error)
      }
    })

    this.router.get('/patients', authenticator, async (req, res, next) => {
      try {
        const patients = await new UserController(req.user).listPateints()
        res.json({ patients })
        next()
      } catch (error) {
        next(error)
      }
    })

    this.router.delete('/signout', authenticator, (req, res, next) => {
      try {
        res.clearCookie('token')
        res.send('Signed out success')
        next()
      } catch (error) {
        next(error)
      }
    })

    function setTokenCookie(res, token, age = SEVEN_DAYS_IN_MILLISECOND) {
      res.cookie('token', token, {
        signed: true,
        maxAge: age,
        httpOnly: true,
        secure: false,
        sameSite: false,
      })
    }
  }
}

export const userRoutesApi = new UserRoutes().router
