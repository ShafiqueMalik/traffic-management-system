import { configureStore } from '@reduxjs/toolkit';
import mapReducer from "app/slices/mapSlice"
import mapReducerTest from "app/slices/mapSliceTest"
export default configureStore({
  reducer: {
    map:mapReducer,
    mapTest:mapReducerTest,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat()
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})