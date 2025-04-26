import Header from "./Header/Header.jsx"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import UniversalMenu from "./UniversalMenu/UniversalMenu.jsx"
import Modal from "./Modal/Modal.jsx"
import SignInForm from "./SignInForm/SignInForm.jsx"
import SignUpForm from "./SignUpForm/SignUpForm.jsx"
import BookingForm from "./BookingForm/BookingForm.jsx"
import { ModalContext } from "../utils/ModalContext.js"
import CustomAlert from "./CustomAlert/CustomAlert.jsx"

const SharedLayout = ({ children }) => {
    
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [modalData, setModalData] = useState(null)
    const [alertOptions, setAlertOptions] = useState(null)

    const showAlert = (severity, message) => {
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

    const openModal = (type, data = null) => {
        setModalType(type)
        setModalData(data)
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
        <ModalContext.Provider value={{openModal}}>
        <>
            <header>
                <Header
                    toggleUserMenu={toggleUserMenu}
                    toggleNavMenu={toggleNavMenu}
                    isUserMenuOpen={isUserMenuOpen}
                    isNavMenuOpen={isNavMenuOpen}
                    openModal={openModal}
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
                openModal={openModal}
                setIsUserMenuOpen={setIsUserMenuOpen}
                showAlert={showAlert}
            />
            {isModalOpen && (
               <Modal onClose={closeModal}>
                    {modalType === 'login' && <SignInForm onClose={closeModal} />}
                    {modalType === 'register' && <SignUpForm onClose={closeModal} />}
                    {modalType === 'booking' && <BookingForm data={modalData} onClose={closeModal} />}
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
        </>
        </ModalContext.Provider>
    )
}

export default SharedLayout