import { configureStore } from '@reduxjs/toolkit'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/root_reducer'

const middlewares = [reduxThunk]

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
})
