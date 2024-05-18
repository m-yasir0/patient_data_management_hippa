import models from './index.js'

export default (mongoose) => {
  const admissionSchema = new mongoose.Schema(
    {
      admission_case: {
        type: String,
        required: true,
        message: 'Case of admission is required',
      },
      ward_details: {
        type: String,
        required: true,
        message: 'Ward details are required',
      },
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  )
  admissionSchema.path('doctor').validate(async function (value) {
    const user = await models.Users.findById(value)
    return user && (user.isAdmin() || user.isDoctor())
  }, 'Only doctor or admin must register a patient')

  const Admissions = mongoose.model('Admissions', admissionSchema)
  return Admissions
}
