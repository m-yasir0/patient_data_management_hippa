export default (mongoose) => {
  const logsSchema = new mongoose.Schema(
    {
      level: String,
      meta: Object,
      timestamp: {
        type: Date,
        default: Date.now,
      },
      message: String,
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  )
  const Log = mongoose.model('Logs', logsSchema)
  return Log
}
