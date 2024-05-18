import { UserRepository } from '../repositories/user_repository.js'
import { AdmissionRepository } from '../repositories/admission_repository.js'
import { authorize } from '../modules/authorization_module/index.js'

import CustomError from '../utilities/custom_error.js'

export class AdmissionController {
  constructor(user) {
    this.controller = 'admissions'
    this.userRepository = new UserRepository()
    this.admissionRepository = new AdmissionRepository()
    this.user = this.userRepository.findUserById(user._id)
  }
  async create(body) {
    const current_user = await this.user
    await authorize(current_user, null, this.controller, 'create')
    let patient = null
    if (!body.patient || typeof body.patient != 'object')
      throw new CustomError(400, 'Pateint data is required')
    body['patient']['role'] = 'patient'

    if (body.patient.id) {
      patient = await this.userRepository.findUserById(body.patient.id)
      if (!patient) throw new CustomError(400, 'Patient data is required')
    } else {
      patient = await this.userRepository.findUser(body.patient?.user_email)
      if (!patient)
        patient = await this.userRepository.registerUser(body.patient)
    }
    body['doctor'] = current_user._id
    body['patient'] = patient._id
    return this.admissionRepository.createAdmission(body)
  }

  async update(id, body) {
    const admission = await this.admissionRepository.findAdmissionById(id)
    if (!admission) this.admissionNotFoundError()

    await authorize(await this.user, admission, this.controller, 'update')

    return this.admissionRepository.updateAdmission(id, body)
  }

  async delete(id) {
    const admission = await this.admissionRepository.findAdmissionById(id)
    if (!admission) this.admissionNotFoundError()

    await authorize(await this.user, admission, this.controller, 'delete')

    return this.admissionRepository.deleteAdmissionById(id)
  }

  async show(id) {
    const admission = await this.admissionRepository.findAdmissionById(id)
    if (!admission) this.admissionNotFoundError()

    await authorize(await this.user, admission, this.controller, 'show')

    return this.admissionRepository.findAdmissionById(id)
  }

  async list() {
    const user = await this.user

    if (user.isPatient())
      return this.admissionRepository.listAllAdmissions({ patient: user._id })
    else if (user.isDoctor())
      return this.admissionRepository.listAllAdmissions({
        $or: [
          {
            patient: user._id,
          },
          {
            doctor: user._id,
          },
        ],
      })
    else return this.admissionRepository.listAllAdmissions({})
  }

  admissionNotFoundError() {
    throw new CustomError(404, 'Admission not found')
  }
}
