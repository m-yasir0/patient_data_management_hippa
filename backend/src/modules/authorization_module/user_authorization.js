import { BaseAuthorization } from './base_authorization.js'

export class UsersAuthorization extends BaseAuthorization {
  constructor(user) {
    super(user)
  }

  async listPatients() {
    return this.user.isDoctor() || this.user.isAdmin()
  }
}
