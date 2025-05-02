import { AlertColor } from "@mui/material"
import { filters } from "../constants"
import { JSX } from "react"


export type ThemeOption = {
    label: JSX.Element
    value: string
    color: string
}


export type FilterName = keyof typeof filters


type SortBy = 'name' | 'price_per_hour' | 'rating'


export type FilterType = {
    sortBy?: SortBy
    direction?: 'asc' | 'desc'
    priceLess?: number
    priceGreater?: number
    isDefault?: boolean
    limit?: number
}


export type AlertOptionsType = {
    severity: AlertColor
    message: string
} | null


export type BookingFormData = {
    name: string
    email: string
    phone: string
    comment: string
    date: string
}


export type SignInFormData = {
    email: string
    password: string
}


export type SignUpFormData = {
    name: string
    email: string
    password: string
}