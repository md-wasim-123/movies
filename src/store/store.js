import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

const store = configureStore({
    reducer: {
        mov: homeSlice
    }
})

export default store