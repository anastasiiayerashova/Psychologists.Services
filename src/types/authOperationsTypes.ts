import { IPsychologist } from "./IPsychologist"
import { FilterType } from "./types"


export type SignInUserCredentials = {
    values: {
        email: string
        password: string
    }
}


export type SignInUserResponse = {
    name: string | null
    email: string | null
    id: string
    token: string
}


export type SignUpUserCredentials = {
    values: {
        name: string
        email: string
        password: string
    }
}


export type SignUpUserResponse = {
    name: string | null
    email: string | null
    id: string
    token: string
}


export type AddFavouritePsychologistCredentials = {
    userId: string
    psychologistId: string
}


export type RemoveFavouritePsychologistCredentials = {
    userId: string
    psychologistId: string
}


export type GetPsychologistResponse = {
    data: IPsychologist[]
    lastVisibleDoc: string | null
    limit: number
}


export interface GetPsychologistsArgs {
    filters?: FilterType
    lastVisibleDoc?: string | null
}


export interface User {
    name: string | null
    email: string | null
    id: string | null
}


export interface AuthState {
    user: User
    favouritesData: IPsychologist[]
    isAuth: boolean
    error: string | null
    loading: boolean
    token: string | null
}


export interface SetUserPayload extends User {
    token: string
}


export interface FiltersState {
    filter: FilterType
    favouritesFilter: FilterType
}


export interface PsychologistsState {
    list: IPsychologist[]
    lastVisibleDoc: string | null
    hasMore: boolean
    loading: boolean
    error: string | null
}