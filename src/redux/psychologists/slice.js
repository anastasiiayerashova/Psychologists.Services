import { createSlice } from "@reduxjs/toolkit";
import { getPsychologists } from "./operations.js";

const initialState = {
    list: [],
    loading: false,
    error: null
}

const slice = createSlice({
    name: 'psychologists',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPsychologists.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPsychologists.fulfilled, (state, { payload }) => {
                state.loading = false
                state.list = payload
            })
            .addCase(getPsychologists.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload
            })
    }
})

export const psychologistsReducer = slice.reducer