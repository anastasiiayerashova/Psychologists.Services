import { AlertColor, SnackbarOrigin } from "@mui/material"
import React, { ReactNode, Ref } from "react"
import { IPsychologist } from "./IPsychologist"

export type AuthButtonsProps = {
    handleLogout?: () => Promise<void>
    showAlert?: (severity: AlertColor, message: string) => void
}

export type BookingFormProps = {
    data: Pick<IPsychologist, 'name' | 'avatar_url'>
    onClose: () => void
}

export interface AlertProps {
    children: ReactNode
    openSnackbar: boolean
    handleSnackbarClose: () => void
    severity?: AlertColor
    alertSx?: object
    anchorOrigin: SnackbarOrigin
}

export type FavouriteButtonProps = {
  isFavourite: boolean
  onClick: () => void
}

export type HeaderProps = {
    toggleUserMenu: () => void
    toggleNavMenu: () => void
    isUserMenuOpen: boolean
    isNavMenuOpen: boolean
}

export type CircularProgressWithLabelProps = {
  value: number
}

export type ModalProps = {
  onClose: () => void
  children: ReactNode
}

export type PasswordHintProps = {
   condition: boolean
   text: string
}

export type PsychologistAvatarProps = {
  data: Pick<IPsychologist, 'name' | 'avatar_url'>
}

export type PsychologistsFeaturesListProps = {
  data: Pick<IPsychologist, 'experience' | 'specialization' | 'initial_consultation' | 'license'>
}

export type PsychologistItemProps = {
    data: IPsychologist
}

export type PsychologistsListProps = {
    list: IPsychologist[]
}

export type ReviewsProps = {
    data: Pick<IPsychologist, 'reviews'>
}

export type SignInFormProps = {
    onClose: () => void
}

export type SignUpFormProps = {
    onClose: () => void
}

export type TimePickerProps = {
    selectedHour: string
    selectedMinute: string
    handleSelect: (hour: string, minute: string) => void
    ref: Ref<HTMLDivElement>
}

export type UniversalMenuProps = {
    isUserMenuOpen: boolean
    toggleUserMenu: () => void
    isNavMenuOpen: boolean
    toggleNavMenu: () => void
    setIsUserMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>
    showAlert?: (severity: AlertColor, message: string) => void
}

export type AnimatedLayoutProps = {
    children: ReactNode
}

export type PrivateRouteProps = {
    component: React.ComponentType
    redirectTo?: string
    redirectToAuth?: string
}

export type SharedLayoutProps = {
    children: ReactNode
}