import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: {}
}

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }) => {
                        console.log("Before setting filters:", state.filter);
            state.filter = payload;
            console.log("After setting filters:", state.filter);
        }
    }
})

export const { setFilters } = slice.actions
export const filtersReducer = slice.reducer