import { AlertColor } from "@mui/material"

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
