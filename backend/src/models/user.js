import { getHash } from '../helpers/bcrypt_helper.js'

export default (mongoose) => {
  const UserSchema = new mongoose.Schema(
    {
      user_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      password: {
        type: String,
        required: true,
        validate: {
          validator: function (password) {
            return /^(?=.*\d)(?=.*[\W_])(?=.*[A-Z])(?=.*[a-z]+).{8,25}$/.test(
              password,
            )
          },
          message:
            'Password must contains atleast 8-25 characters, 1 capital and 1 or more lower case letter,1 symbol and a numberic digit',
        },
      },
      role: {
        type: String,
        required: true,
        enum: ['patient', 'doctor', 'admin'],
      },
    },
    { timestamps: true },
  )

  UserSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified('password')) {
      return next()
    }
    try {
      user.password = await getHash(user.password)
      next()
    } catch (error) {
      return next(error)
    }
  })

  UserSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
      next(new Error('Email address already exists'))
    } else {
      next(error)
    }
  })

  UserSchema.methods.isAdmin = function () {
    return this.role === 'admin'
  }
  UserSchema.methods.isDoctor = function () {
    return this.role === 'doctor'
  }
  UserSchema.methods.isPatient = function () {
    return this.role === 'patient'
  }
  const UserModel = mongoose.model('Users', UserSchema)
  return UserModel
}
