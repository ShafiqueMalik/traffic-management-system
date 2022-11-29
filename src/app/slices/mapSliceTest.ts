import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allMarkers:[] as any[],
  copiedCustomMarkerElement:null as any,
  selectedImage:null as any,
  activeImageId:0 as number,
  activeMarkerId:0 as number
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setAllMarkers: (state,action) => {
      state.allMarkers.push(action.payload)
    },
    removeMarker: (state,action) => {
      state.allMarkers = state.allMarkers.filter((m:any)=>m!=action.payload);
    },
    setCopiedMarkerElement: (state,action) => {
      state.copiedCustomMarkerElement = action.payload;
    },
    setActiveImageId: (state,action) => {
      state.activeImageId = action.payload;
    },
    setActiveMarkerId: (state,action) => {
      state.activeMarkerId = action.payload;
    },
    
    
    setSelectedImage: (state,action) => {
      state.selectedImage = action.payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const {setAllMarkers,removeMarker,setCopiedMarkerElement,
  setSelectedImage,setActiveImageId,setActiveMarkerId 
} = mapSlice.actions

export default mapSlice.reducer