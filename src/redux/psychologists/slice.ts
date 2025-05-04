import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPsychologists } from "./operations.ts";
import { GetPsychologistResponse, PsychologistsState } from "../../types/authOperationsTypes.ts";

const initialState: PsychologistsState = {
    list: [],
    lastVisibleDoc: null,
    hasMore: true,
    loading: false,
    error: null
}

const slice = createSlice({
    name: 'psychologists',
    initialState,
    selectors: {
        selectList: state => state.list,
        selectLastVisibleDoc: state => state.lastVisibleDoc,
        selectHasMore: state => state.hasMore,
        selectLoading: state => state.loading,
        selectError: state => state.error
    },
    reducers: {
        resetList: (state) => {
            state.list = []
            state.hasMore = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPsychologists.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getPsychologists.fulfilled, (state, { payload }: PayloadAction<GetPsychologistResponse>) => {
                state.loading = false
                state.list = [...state.list, ...payload.data]
                state.lastVisibleDoc = payload.lastVisibleDoc
                state.hasMore = payload.data.length === payload.limit
            })
            .addCase(getPsychologists.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload as string | null
            })
    }
})

export const psychologistsReducer = slice.reducer
export const {resetList} = slice.actions
export const {selectError, selectLoading, selectList, selectHasMore, selectLastVisibleDoc} = slice.selectors