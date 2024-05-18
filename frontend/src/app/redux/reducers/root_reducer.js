import { combineReducers } from '@reduxjs/toolkit'
import admissionReducers from './admission_reducer'
import logsReducers from './logs_reducer'

const rootReducer = combineReducers({
  admission: admissionReducers,
  logs: logsReducers,
})

export default rootReducer
