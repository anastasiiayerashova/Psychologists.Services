import s from './UniversalMenu.module.css'
import { Link, useLocation } from 'react-router-dom'
import { svg } from '../../constants/index.js'

const UniversalMenu = ({ isUserMenuOpen, toggleUserMenu, isNavMenuOpen, toggleNavMenu, openModal }) => {
    
    const location = useLocation()

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

                {isUserMenuOpen && (
                    <div className={s.content}>
                        <button className={s.log_btn} onClick={() => openModal('login')}>Log In</button>
                        <button className={s.reg_btn} onClick={() => openModal('register')}>Registration</button>
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