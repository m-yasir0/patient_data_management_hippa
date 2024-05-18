import { UserRepository } from '../repositories/user_repository.js'
import signToken from '../helpers/authentication_helper.js'
import { compareHash } from '../helpers/bcrypt_helper.js'
import CustomError from '../utilities/custom_error.js'
import { authorize } from '../modules/authorization_module/index.js'

export class UserController {
  constructor(user = null) {
    this.repository = new UserRepository()
    this.controller = 'users'
    user && (this.user = this.repository.findUserById(user._id))
  }
  async registerUser(body) {
    if (!['patient', 'doctor'].includes(body.role))
      throw new CustomError(400, 'Only doctor or patient is allowed.')
    const user = (await this.repository.registerUser(body))?.toJSON()
    delete user['password']
    return { token: signToken(user), user }
  }

  async getUserToken(body) {
    const user = (await this.repository.findUser(body.user_email))?.toJSON()
    if (!user) throw new CustomError(400, 'User not found')
    if (await compareHash(body.password, user.password)) {
      delete user['password']
      return { token: signToken(user), user }
    } else {
      throw new CustomError(
        401,
        'User not authorized. Email or password is not correct',
      )
    }
  }

  async listPateints() {
    await authorize(await this.user, null, this.controller, 'listPatients')

    return this.repository.listPatients()
  }
}
