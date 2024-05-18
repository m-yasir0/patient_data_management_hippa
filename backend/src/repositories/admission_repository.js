import models from '../models/index.js'

export class AdmissionRepository {
  constructor() {
    this.Admissions = models.Admissions
  }

  createAdmission({ admission_case, ward_details, doctor, patient }) {
    return this.Admissions.create({
      admission_case,
      ward_details,
      doctor,
      patient,
    })
  }

  findAdmissionById(id) {
    return this.Admissions.findById(id)
      .populate('doctor', '-password')
      .populate('patient', '-password')
  }

  deleteAdmissionById(id) {
    return this.Admissions.findByIdAndDelete(id)
  }
  listAllAdmissions(options) {
    return this.Admissions.find(options)
      .populate('doctor', '-password')
      .populate('patient', '-password')
  }
  updateAdmission(id, { ward_details, doctor }) {
    return this.Admissions.findByIdAndUpdate(id, {
      ward_details,
      doctor,
    })
  }
}
