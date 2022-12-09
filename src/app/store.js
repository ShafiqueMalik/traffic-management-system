import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "app/slices/globalSlice"
import mapReducer from "app/slices/mapSlice"
export default configureStore({
  reducer: {
    map:mapReducer,
    global:globalReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat()
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})