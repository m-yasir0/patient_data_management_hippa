import jwt from 'jsonwebtoken'
import customError from '../utilities/custom_error.js'

/**
 * Middleware for user auth
 * Verifies the token in header and create user session
 * create error for unverified token
 * Scheme Bearer
 */
var authenticator = (req, res, next) => {
  var token = req.signedCookies.token
  if (!token) {
    let err = new customError(403, 'User token is required')
    next(err)
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)
      req.user = decoded
    } catch (err) {
      err = new customError(401, 'Unable to verify user token')
      next(err)
    }
  }
  next()
}

export { authenticator }
