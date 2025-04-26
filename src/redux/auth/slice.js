import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { signUpUser, signInUser, signOutUser } from "./operations.js";

const initialState = {
    user: {
        name: null,
        email: null,
        id: null,
    },
    isAuth: false,
    error: null,
    loading: false,
    token: null
}

const slice = createSlice({
    name: 'auth',
    initialState,
    selectors: {
        selectIsAuth: state => state.isAuth,
        selectError: state => state.error,
        selectName: state => state.user.name,
    },
    reducers: {
        setUser: (state, { payload }) => {
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
            .addCase(signUpUser.fulfilled, (state, { payload }) => {
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
            .addCase(signInUser.fulfilled, (state, { payload }) => {
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
            .addMatcher(isAnyOf(signUpUser.pending, signInUser.pending, signOutUser.pending), (state) => {
                state.loading = true
                state.error = null
                state.isAuth = false
            })
            .addMatcher(isAnyOf(signUpUser.rejected, signInUser.rejected, signOutUser.rejected), (state, { payload }) => {
                state.loading = false
                state.error = payload
                state.isAuth = false
           })
    }
})

export const authReducer = slice.reducer
export const { setUser, logoutUser } = slice.actions
export const {selectIsAuth, selectError, selectName} = slice.selectors