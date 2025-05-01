import { useContext, createContext } from "react";
import { IPsychologist } from "../types/IPsychologist";

type ModalContextType = {
    openModal: (modalType: string, data?: Pick<IPsychologist, 'name' | 'avatar_url'> | null) => void
    showAlert: (type: 'error' | 'success' | 'info' | 'warning', message: string) => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('useModal must be used within a ModalProvider')
    }

    return context
}