import { useSelector } from 'react-redux'
import s from './AuthButtons.module.css'
import { selectIsAuth } from '../../redux/auth/slice.js'
import { useModal } from '../../utils/ModalContext.js'

const AuthButtons = ({ handleLogout }) => {
    
    const {openModal, showAlert} = useModal()

    const isAuth = useSelector(selectIsAuth)

    const onLogoutClick = () => {
        handleLogout()
        showAlert('success', 'You have logged out!')
        setTimeout(() => {
            handleLogout()
        }, 500)
    }

    return (
        <>
            {!isAuth ? (
             <>
                  <button className={s.log_btn} onClick={() => openModal('login')}>Log In</button>
                  <button className={s.reg_btn} onClick={() => openModal('register')}>Registration</button>
             </>
            )
                : 
            (
                <button className={s.logOut_btn} onClick={onLogoutClick}>Log out</button>
            )}
        </>
    )
 }

export default AuthButtons