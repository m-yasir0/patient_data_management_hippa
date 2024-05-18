import { authorize } from '../modules/authorization_module/index.js'
import { LogsRepository } from '../repositories/logs_repository.js'
import { UserRepository } from '../repositories/user_repository.js'

export class LogsController {
  constructor(user) {
    this.repository = new LogsRepository()
    this.controller = 'logs'
    this.user = new UserRepository().findUserById(user._id)
  }

  async listLogs() {
    await authorize(await this.user, null, this.controller, 'listLogs')

    return this.repository.listLogs()
  }
}
