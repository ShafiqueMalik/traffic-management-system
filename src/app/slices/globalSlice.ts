import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    showSignCaption: false,
    showFilterAccordion: false,
    showAllAccordion: false,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        toggleSignCaption: (state, action) => {
                state.showSignCaption = !state.showSignCaption
        },
        toggleFilterAccordion: (state,action:PayloadAction<boolean | undefined>) => {
            if (typeof action?.payload === "boolean") {
                state.showFilterAccordion = action?.payload;
            } else {
                state.showFilterAccordion = !state.showFilterAccordion;
            }
        },
        toggleAllAccordion: (state) => {
            state.showAllAccordion = !state.showAllAccordion
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleSignCaption, toggleFilterAccordion, toggleAllAccordion } = globalSlice.actions

export default globalSlice.reducer