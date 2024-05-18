import CustomError from '../../utilities/custom_error.js'
import { AdmissionsAuthorization } from './admission_authorization.js'
import { LogsAuthorization } from './logs_authorization.js'
import { UsersAuthorization } from './user_authorization.js'

const mappedClassesToStrings = {
  admissions: AdmissionsAuthorization,
  users: UsersAuthorization,
  logs: LogsAuthorization,
}

export async function authorize(user, record, controllerClass, action) {
  if (
    !(await new mappedClassesToStrings[controllerClass](user, record)[action]())
  )
    throw new CustomError(
      403,
      `User is not authorized to perform ${action} on ${
        controllerClass.split(/(?=[A-Z])/)[0]
      }`,
    )
}
