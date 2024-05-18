import { actionTrace } from './logger_middleware.js'
import { logger } from '../modules/logging_module.js/index.js'

export const error_handler_middleware = (err, req, res, next) => {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
  res.locals.message = err.message
  const status = err.statusCode || err.status || 500
  res.locals.status = status
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  const action = actionTrace(req)
  logger.error({
    meta: {
      user:
        req.user?._id ||
        req.headers['user-agent'] +
          ' ' +
          (req.headers['x-forwarded-for'] || req.connection.remoteAddress),
      action: action.join('#'),
    },
    timestamp: new Date(),
    message: `Error! ${JSON.stringify(err.message)}`,
  })

  res.status(status).json({
    error: {
      statusCode: status,
      messages: err.message,
    },
  })
}
