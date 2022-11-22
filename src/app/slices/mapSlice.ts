import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allMarkers:[] as any[],
  copiedCustomMarkerElement:null as any
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setAllMarkers: (state,action) => {
      state.allMarkers.push(action.payload)
    },
    removeMarker: (state,action) => {
      // state.allMarkers.push(action.payload)
      state.allMarkers = state.allMarkers.filter((m:any)=>m!=action.payload);
    },
    setCopiedMarkerElement: (state,action) => {
      // state.allMarkers.push(action.payload)
      state.copiedCustomMarkerElement = action.payload;
    },
    
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const {setAllMarkers,removeMarker,setCopiedMarkerElement } = mapSlice.actions

export default mapSlice.reducer