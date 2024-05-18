import { logger } from '../modules/logging_module.js/index.js'

export const logger_middleware = (req, _res, next) => {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  const action = actionTrace(req)

  logger.info({
    meta: {
      user:
        req.user?._id ||
        req.headers['user-agent'] +
          ' ' +
          (req.headers['x-forwarded-for'] || req.connection.remoteAddress),
      action: action.join('#'),
    },
    timestamp: new Date(),
    message: generateLoggerMessage(req, action),
  })

  next()
}

export function actionTrace(req) {
  return req.url
    .split('/')
    .filter((val) => val != '')
    .map((val) => val.capitalize())
}

function generateLoggerMessage(req, action) {
  const desc = action.slice().reverse().join(' on ')
  const act = action[action.length - 1]
  const controller = action[0]
  let details = ''
  switch (act) {
    case 'Create':
      details += `${controller} created, id#${req.payload?._id}`
      break
    case 'Show':
      details += `${controller} show request, id#${req.payload?._id}`
      break
    case 'List':
      details += `${controller} list request.`
      break
    case 'Update':
      details += `${controller} updated, id#${req.payload?._id}`
      break
    case 'Delete':
      details += `${controller} deleted, id#${
        req.payload?._id
      }. Previous: ${JSON.stringify(req.payload || {})}`
      break
    case 'Signin':
      details += `User signin request. User: ${req.body?.user_email}`
      break
    case 'Register':
      details += `User registeration request. User: ${req.body?.user_email}`
      break

    default:
      break
  }

  return `Called ${desc}. Method#${req.method}. ${details}`
}
