import { useSelector } from 'react-redux'
import s from './AuthButtons.module.css'
import { selectIsAuth } from '../../redux/auth/slice.ts'
import { useModal } from '../../utils/ModalContext.ts'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutsideHook.ts'
import { AuthButtonsProps } from '../../types/PropsTypes.ts'
import { RootState } from '../../redux/store.ts'


const AuthButtons = ({ handleLogout }: AuthButtonsProps) => {
    
    const { openModal, showAlert } = useModal()
    const [pickerOpen, setPickerOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const isAuth = useSelector<RootState, boolean>(selectIsAuth)
    useClickOutside(dropdownRef, () => setPickerOpen(false))

    const onLogoutClick = (): void => {
        handleLogout?.()
        showAlert?.('success', 'You have logged out!')
        setTimeout(() => {
            handleLogout?.()
        }, 500)
    }

    return (
        <>
            {!isAuth ? (
             <>
                <button type='button' className={s.log_btn} onClick={() => openModal('login')}>Log In</button>
                <button type='button' className={s.reg_btn} onClick={() => openModal('register')}>Registration</button>
             </>
            )
                : 
            (
                <div className={s.time_picker_wrapper}>
                    <button type='button' className={s.logOut_btn} onClick={() => setPickerOpen(!pickerOpen)}>Log out</button>
                           {pickerOpen && (
                                <motion.div
                                    className={s.popover}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    ref={dropdownRef}
                                >
                                    <p className={s.popover_title}>Are you sure?..</p>
                                    <div className={s.picker}>  
                                        <button type='button' className={s.yes_btn} onClick={onLogoutClick}>Yes</button>
                                        <button type='button' className={s.no_btn} onClick={() => setPickerOpen(!pickerOpen)}>No</button>
                                    </div>
                                </motion.div>
                            )}
                </div>
            )}
        </>
    )
 }

export default AuthButtons