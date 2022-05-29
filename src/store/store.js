import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../containers/reducer"

let initialState = {}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  devTools: true,
})

export default store
