import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../types/authOperationsTypes";
import { FilterType } from "../../types/types";

const initialState: FiltersState = {
    filter: {}
}

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }: PayloadAction<FilterType>) => {
            console.log("Before setting filters:", state.filter);
            state.filter = payload;
            console.log("After setting filters:", state.filter);
        },
        resetFilters: (state) => {
            state.filter = {}
        }
    }
})

export const { setFilters, resetFilters } = slice.actions
export const filtersReducer = slice.reducer