import s from './UniversalMenu.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/auth/slice.js'
import { signOutUser } from '../../redux/auth/operations.js'

const UniversalMenu = ({ isUserMenuOpen, toggleUserMenu, isNavMenuOpen, toggleNavMenu, openModal, setIsUserMenuOpen }) => {
    
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(signOutUser())
        setIsUserMenuOpen(false)
        navigate('/')
    }

    return (
       <div className={s.mob_menu_wrapper}>
            <div className={`${s.overlay} ${isNavMenuOpen || isUserMenuOpen ? s.active : ''}`}
                onClick={() => {
                if (isNavMenuOpen) toggleNavMenu()
                if (isUserMenuOpen) toggleUserMenu()
            }}>
            </div>
            <div className={`${s.mob_menu} ${isNavMenuOpen || isUserMenuOpen ? s.is_open : ''}`}>
               <div className={s.mob_menu_close_wrapper}>
                  <button onClick={isUserMenuOpen ? toggleUserMenu : toggleNavMenu} className={s.mob_menu_close_btn}>
                     <svg className={s.icon_check} width={16} height={16}>
                        <use href={`${svg}#icon-x`} />
                     </svg>
                  </button>
                </div>

                {isUserMenuOpen && !isAuth && (
                    <div className={s.content}>
                        <button className={s.log_btn} onClick={() => openModal('login')}>Log In</button>
                        <button className={s.reg_btn} onClick={() => openModal('register')}>Registration</button>
                    </div>
                )}

                 {isUserMenuOpen && isAuth && (
                    <div className={s.content}>
                        <button className={s.logOut_btn} onClick={handleLogout}>Log out</button>
                    </div>
                )}

                {isNavMenuOpen && (
                    <div className={s.content}>
                        <Link to='/' onClick={toggleNavMenu} className={`${location.pathname === '/' ? s.active_link : ''}`}>Home</Link>
                        <Link to='/psychologists' onClick={toggleNavMenu} className={`${location.pathname === '/psychologists' ? s.active_link : ''}`}>Psychologists</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UniversalMenu