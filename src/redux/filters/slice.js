import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: {}
}

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }) => {
            state.filter = payload
        }
    }
})

export const { setFilters } = slice.actions
export const filtersReducer = slice.reducer