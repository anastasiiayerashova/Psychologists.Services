import s from './UniversalMenu.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.ts'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectName } from '../../redux/auth/slice.ts'
import { signOutUser } from '../../redux/auth/operations.ts'
import AuthButtons from '../AuthButtons/AuthButtons.tsx'
import ControlledSwitch from '../ControlledSwitch/ControlledSwitch.tsx'
import { UniversalMenuProps } from '../../types/PropsTypes.ts'
import { AppDispatch } from '../../redux/store.ts'
import { resetFilters } from '../../redux/filters/slice.ts'

const UniversalMenu = ({ isUserMenuOpen, toggleUserMenu, isNavMenuOpen, toggleNavMenu, setIsUserMenuOpen, showAlert }: UniversalMenuProps) => {
    
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)
    const userName = useSelector(selectName)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(signOutUser())
        dispatch(resetFilters())
        setIsUserMenuOpen?.(false)
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
                    {isAuth && (
                    <div className={s.head_wrap}>
                        <div className={s.green_wrap}>
                            <svg width={16} height={16}>
                               <use href={`${svg}#icon-user`} />
                            </svg>
                        </div>
                        <p className={s.user_name}>{userName}</p>   
                    </div>
                    )}
                  <button type='button' onClick={isUserMenuOpen ? toggleUserMenu : toggleNavMenu} className={s.mob_menu_close_btn}>
                     <svg className={s.icon_check} width={18} height={18}>
                        <use href={`${svg}#icon-x`} />
                     </svg>
                  </button>
                </div>

                {isUserMenuOpen && !isAuth && (
                    <div className={s.content}>
                        <AuthButtons />
                    </div>
                )}

                 {isUserMenuOpen && isAuth && (
                    <div className={s.content}>
                        <AuthButtons handleLogout={handleLogout} showAlert={showAlert} />
                    </div>
                )}

                {isNavMenuOpen && (
                    <div className={s.content}>
                        <Link to='/' onClick={toggleNavMenu} className={`${location.pathname === '/' ? s.active_link : ''}`}>Home</Link>
                        <Link to='/psychologists' onClick={toggleNavMenu} className={`${location.pathname === '/psychologists' ? s.active_link : ''}`}>Psychologists</Link>
                        {isAuth && (
                            <Link to='/favorites' onClick={toggleNavMenu} className={`${location.pathname === '/favorites' ? s.active_link : ''}`}>Favorites</Link>
                        )}
                        <ControlledSwitch/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UniversalMenu