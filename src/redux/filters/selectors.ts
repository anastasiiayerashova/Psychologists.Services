import { RootState } from "../store";

export const selectFilters = (state: RootState) => state.filters.filter
export const selectFavouritesFilters = (state: RootState) => state.filters.favouritesFilter