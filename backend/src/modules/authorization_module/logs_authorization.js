import { BaseAuthorization } from './base_authorization.js'

export class LogsAuthorization extends BaseAuthorization {
  constructor(user) {
    super(user)
  }

  async listLogs() {
    return this.user.isAdmin()
  }
}
