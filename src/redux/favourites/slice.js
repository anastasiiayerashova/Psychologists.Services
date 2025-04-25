import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourites: JSON.parse(localStorage.getItem('favourites')) || []
}

const slice = createSlice({
    name: 'favourites',
    initialState,
    selectors: {
        selectFavourites: state => state.favourites
    },
    reducers: {
        toggleFavourite: (state, { payload }) => {

            const pshychologist = payload

            const exists = state.favourites.find(favourite => favourite.id === pshychologist.id)

            if (exists) {
                state.favourites = state.favourites.filter(favourite => favourite.id !== pshychologist.id)
            }
            else {
                state.favourites.push(pshychologist)
            }

            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        },

        removeFavourite: (state, { payload }) => {
            
            state.favourites = state.favourites.filter(favourite => favourite.id !== payload)

            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        }
    }
})

export const {selectFavourites} = slice.selectors
export const { toggleFavourite, removeFavourite } = slice.actions
export const favouritesReducer = slice.reducer