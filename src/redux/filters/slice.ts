import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../types/authOperationsTypes";
import { FilterType } from "../../types/types";

const initialState: FiltersState = {
    filter: {},
    favouritesFilter: {}
}

const slice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, { payload }: PayloadAction<FilterType>) => {
            state.filter = payload
        },
        resetFilters: (state) => {
            state.filter = {}
        },
        setFavouritesFilter: (state, { payload }: PayloadAction<FilterType>) => {
            state.favouritesFilter = payload
        },
        resetFavouritesFilters: (state) => {
            state.favouritesFilter = {}
        }
    }
})

export const { setFilters, resetFilters, setFavouritesFilter, resetFavouritesFilters } = slice.actions
export const filtersReducer = slice.reducer