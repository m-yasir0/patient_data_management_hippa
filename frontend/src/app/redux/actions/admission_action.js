import { ADMISSION_URL } from '../../../utils/app_constants'
import { fetchData } from '../../../helpers/fetch_helper'
import { DELETE_ADMISSION, LIST_ADMISSION, SHOW_ADMISSION } from '../types'

const setAdmission = (admission, action) => ({
  type: action,
  payload: admission,
})

export const listAdmission = () => {
  return async function (dispatch) {
    let res = await fetchData(`${ADMISSION_URL}/list`, 'get')
    res && dispatch(setAdmission(res.data.admissions, LIST_ADMISSION))
  }
}

export const showAdmission = (id, admission = null) => {
  return async function (dispatch) {
    if (!admission) {
      let res = await fetchData(`${ADMISSION_URL}/${id}/show`, 'get')
      res && dispatch(setAdmission(res.data.admission, SHOW_ADMISSION))
    } else dispatch(setAdmission(admission, SHOW_ADMISSION))
  }
}

export const deleteAdmission = (id) => {
  return async function (dispatch) {
    let res = await fetchData(
      `${ADMISSION_URL}/${id}/delete`,
      'delete',
      'Admission deleted!',
    )
    res && dispatch(setAdmission(id, DELETE_ADMISSION))
  }
}
