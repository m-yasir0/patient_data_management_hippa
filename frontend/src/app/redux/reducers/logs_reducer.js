import { LIST_LOGS } from '../types'

const initialState = {
  logs: [],
}

const logsReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LOGS:
      return {
        ...state,
        logs: action.payload,
      }
    default:
      return state
  }
}

export default logsReducers
