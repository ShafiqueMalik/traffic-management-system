import { configureStore } from '@reduxjs/toolkit';
import mapReducer from "app/slices/mapSlice"
export default configureStore({
  reducer: {
    map:mapReducer
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat()
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})