import { DELETE_ADMISSION, LIST_ADMISSION, SHOW_ADMISSION } from '../types'

const initialState = {
  admissions: [],
  admission: {},
}

const admissionReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADMISSION:
      return {
        ...state,
        admissions: action.payload,
      }
    case SHOW_ADMISSION:
      return {
        ...state,
        admission: action.payload,
      }
    case DELETE_ADMISSION:
      if (state.admissions.length) {
        let admissions = state.admissions.slice()
        const index = filterAdmissionIndex(action.payload, state.admissions)
        if (index !== -1) {
          admissions.splice(index, 1)
          return {
            ...state,
            admissions,
            admission: {},
          }
        }
      } else
        return {
          ...state,
          admission: {},
        }
      break
    default:
      return state
  }
}

function filterAdmissionIndex(id, admissions) {
  return admissions.findIndex((val) => val._id === id)
}

export default admissionReducers
