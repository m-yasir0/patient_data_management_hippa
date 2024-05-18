import models from '../models/index.js'

export class LogsRepository {
  constructor() {
    this.Logs = models.Logs
  }
  listLogs() {
    return this.Logs.find({})
  }
}
