import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, signInUser, signOutUser, addFavouritePsychologist, removeFavouritePsychologist, getFavouritesPsychologists } from "./operations.ts";
import { IPsychologist } from "../../types/IPsychologist.ts";
import { AuthState, User, SetUserPayload } from "../../types/authOperationsTypes.ts";

const initialState: AuthState = {
    user: {
        name: null,
        email: null,
        id: null,
    },
    favouritesData: [],
    isAuth: false,
    error: null,
    loading: false,
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    selectors: {
        selectFavouritesData: state => state.favouritesData,
        selectIsAuth: state => state.isAuth,
        selectError: state => state.error,
        selectName: state => state.user.name,
        selectEmail: state => state.user.email,
        selectUserId: state => state.user.id,
        selectLoading: state => state.loading
    },
    reducers: {
        resetFavouritesList: (state) => {
            state.favouritesData = []
        },
        setUser: (state, { payload }: {payload: User & {token: string}}) => {
            state.user = {
                name: payload.name,
                email: payload.email,
                id: payload.id
            }
            state.loading = false
            state.error = null
            state.isAuth = true
            state.token = payload.token
        },
        logoutUser: (state) => {
            state.user = {
                name: null,
                email: null,
                id: null,
            }
            state.loading = false
            state.error = null
            state.isAuth = false
            state.token = null
        }
    },
    extraReducers: (build) => {
        build
            .addCase(signUpUser.fulfilled, (state, { payload }: PayloadAction<SetUserPayload>) => {
                state.loading = false
                state.isAuth = true
                state.error = null
                state.user = {
                    name: payload.name,
                    email: payload.email,
                    id: payload.id
                }
                state.token = payload.token
            })
            .addCase(signInUser.fulfilled, (state, { payload }: PayloadAction<SetUserPayload>) => {
                state.loading = false
                state.isAuth = true
                state.error = null
                state.user = {
                    name: payload.name,
                    email: payload.email,
                    id: payload.id
                }
                state.token = payload.token
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.user = {
                    name: null,
                    email: null,
                    id: null
                }
                state.token = null
                state.isAuth = false
                state.error = null
                state.loading = false
            })
            .addCase(addFavouritePsychologist.fulfilled, (state, { payload }: PayloadAction<IPsychologist>) => {
                if (!state.favouritesData.includes(payload)) {
                    state.favouritesData.push(payload)
                }
            })
            .addCase(removeFavouritePsychologist.fulfilled, (state, { payload }: PayloadAction<string>) => {
                state.favouritesData = state.favouritesData.filter(psychologist => psychologist.id !== payload)
            })
            .addCase(getFavouritesPsychologists.fulfilled, (state, { payload }: PayloadAction<IPsychologist[]>) => {
                state.favouritesData = payload
            })
            .addMatcher(isAnyOf(signUpUser.pending, signInUser.pending, signOutUser.pending), (state) => {
                state.loading = true
                state.error = null
                state.isAuth = false
            })
            .addMatcher(isAnyOf(signUpUser.rejected, signInUser.rejected, signOutUser.rejected), (state, { payload }) => {
                state.loading = false
                state.error = payload as string | null
                state.isAuth = false
           })
    }
})

export const authReducer = slice.reducer
export const { setUser, logoutUser, resetFavouritesList } = slice.actions
export const {selectIsAuth, selectError, selectName, selectUserId, selectFavouritesData, selectLoading, selectEmail} = slice.selectors