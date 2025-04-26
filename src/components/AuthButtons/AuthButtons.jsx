import { useSelector } from 'react-redux'
import s from './AuthButtons.module.css'
import { selectIsAuth } from '../../redux/auth/slice.js'

const AuthButtons = ({openModal, handleLogout}) => {

    const isAuth = useSelector(selectIsAuth)

    return (
        <>
            {!isAuth && (
             <>
                  <button className={s.log_btn} onClick={() => openModal('login')}>Log In</button>
                  <button className={s.reg_btn} onClick={() => openModal('register')}>Registration</button>
             </>
            )}
            
            {isAuth && (
                <button className={s.logOut_btn} onClick={handleLogout}>Log out</button>
            )}
        </>
       
    )
 }

export default AuthButtons