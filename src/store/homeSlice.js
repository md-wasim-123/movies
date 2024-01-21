import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    url: {},
    genres: {}
}


export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getApiContent: (state, actiom) => {
            state.url = actiom.payload
        },
        getgenres: (state, actiom) => {
            state.genres = actiom.payload;
        }
    }
})

export const { getApiContent, getgenres } = homeSlice.actions
export default homeSlice.reducer;
