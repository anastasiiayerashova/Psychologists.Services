import Header from "./Header/Header.jsx"
import { useState, useEffect, Suspense } from "react"
import UniversalMenu from "./UniversalMenu/UniversalMenu.tsx"
import Modal from "./Modal/Modal.tsx"
import SignInForm from "./SignInForm/SignInForm.tsx"
import SignUpForm from "./SignUpForm/SignUpForm.tsx"
import BookingForm from "./BookingForm/BookingForm.tsx"
import { ModalContext } from "../utils/ModalContext.ts"
import CustomAlert from "./CustomAlert/CustomAlert.tsx"
import { SharedLayoutProps } from "../types/PropsTypes.ts"
import { AlertOptionsType } from "../types/types.ts"
import { AlertColor } from "@mui/material"
import { IPsychologist } from "../types/IPsychologist.ts"
import ClickSpark from "../blocks/Animations/ClickSpark/ClickSpark.tsx"

const SharedLayout = ({ children }: SharedLayoutProps) => {
    
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string | null>(null)
    const [modalData, setModalData] = useState<Pick<IPsychologist, 'name' | 'avatar_url'> | null>(null)
    const [alertOptions, setAlertOptions] = useState<AlertOptionsType>(null)

    const showAlert = (severity: AlertColor, message: string) => {
        setAlertOptions({ severity, message })
        setTimeout(() => {
            setAlertOptions(null)
        }, 2000)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
    }
    
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prev => !prev);
    }

    const openModal = (type: string, data?: Pick<IPsychologist, 'name' | 'avatar_url'> | null) => {
        setModalType(type)
        setModalData(data ?? null)
        setIsModalOpen(true)
        setIsUserMenuOpen(false)
        setIsNavMenuOpen(false)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setModalType(null)
        setModalData(null)
    }

    useEffect(() => {
        const isMenuOpen = isUserMenuOpen || isNavMenuOpen

        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isUserMenuOpen, isNavMenuOpen])
    
    return (
        <ModalContext.Provider value={{openModal, showAlert}}>
        <ClickSpark sparkColor='#E9A5F1'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}>
            <header>
                <Header
                    toggleUserMenu={toggleUserMenu}
                    toggleNavMenu={toggleNavMenu}
                    isUserMenuOpen={isUserMenuOpen}
                    isNavMenuOpen={isNavMenuOpen}
                />
            </header>
                
            <main>
                <Suspense fallback={null}>{children}</Suspense>
            </main>
            
            <UniversalMenu
                isUserMenuOpen={isUserMenuOpen}
                isNavMenuOpen={isNavMenuOpen}
                toggleUserMenu={toggleUserMenu}
                toggleNavMenu={toggleNavMenu}
                setIsUserMenuOpen={setIsUserMenuOpen}
                showAlert={showAlert}
            />
            {isModalOpen && (
               <Modal onClose={closeModal}>
                    {modalType === 'login' && <SignInForm onClose={closeModal} />}
                    {modalType === 'register' && <SignUpForm onClose={closeModal} />}
                    {modalType === 'booking' && modalData && <BookingForm data={modalData} onClose={closeModal} />}
                </Modal>
                )}
                {alertOptions && (
                     <CustomAlert
                        severity={alertOptions.severity}
                        openSnackbar={!!alertOptions}
                        handleSnackbarClose={() => setAlertOptions(null)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        alertSx={{ height: 'auto' }}
                    >
                      {alertOptions.message}
                    </CustomAlert>
                )}
        </ClickSpark>
        </ModalContext.Provider>
    )
}

export default SharedLayout