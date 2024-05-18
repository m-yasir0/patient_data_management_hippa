import { BaseAuthorization } from './base_authorization.js'

export class AdmissionsAuthorization extends BaseAuthorization {
  constructor(user, admission) {
    super(user, admission)
  }

  async create() {
    return this.user.isDoctor() || this.user.isAdmin()
  }

  async update() {
    return (
      this.user._id == this.record?.doctor._id.toString() || this.user.isAdmin()
    )
  }

  async show() {
    return this.update()
  }

  async delete() {
    return await this.update()
  }
}
