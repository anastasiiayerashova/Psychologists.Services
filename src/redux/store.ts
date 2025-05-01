import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./filters/slice.ts";
import { psychologistsReducer } from "./psychologists/slice.ts";
import { authReducer } from "./auth/slice.ts";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        psychologists: psychologistsReducer,
        auth: authReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>