import models from '../models/index.js'

export class UserRepository {
  constructor() {
    this.Users = models.Users
  }

  registerUser({ role, user_email, password }) {
    return this.Users.create({
      role,
      user_email,
      password,
    })
  }

  findUser(user_email) {
    return this.Users.findOne({ user_email })
  }

  findUserById(id) {
    return this.Users.findById(id)
  }

  listPatients() {
    return this.Users.find({ role: 'patient' }).select('user_email _id')
  }
}
