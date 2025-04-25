import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./filters/slice.js";
import { psychologistsReducer } from "./psychologists/slice.js";
import { favouritesReducer } from "./favourites/slice.js";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        psychologists: psychologistsReducer,
        favourites: favouritesReducer
    }
})