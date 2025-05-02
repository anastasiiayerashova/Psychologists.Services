import s from './Header.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.ts';
import UniversalMenu from '../UniversalMenu/UniversalMenu.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectName } from '../../redux/auth/slice.ts';
import AuthButtons from '../AuthButtons/AuthButtons.tsx';
import { signOutUser } from '../../redux/auth/operations.ts';
import ControlledSwitch from '../ControlledSwitch/ControlledSwitch.tsx';
import { useState, useEffect } from 'react';
import { HeaderProps } from '../../types/PropsTypes.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';


const Header = ({ toggleUserMenu, toggleNavMenu, isUserMenuOpen, isNavMenuOpen }: HeaderProps) => {
    
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const isAuth = useSelector<RootState, boolean>(selectIsAuth)
    const userName = useSelector<RootState, string | null>(selectName)
    const navigate = useNavigate()
    const [showSwitch, setShowSwitch] = useState<boolean>(false)

    const handleLogout = async () => {
        await dispatch(signOutUser())
        navigate('/')
    }

        useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowSwitch(true)
            } else {
                setShowSwitch(false)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
        <div className={s.container}>
            <div className={s.first_wrapper}>
                <Link to='/'><p className={s.logo}>psychologists.<span>services</span></p></Link>
            </div>
                 <div className={s.links_wrapper}>
                    <Link to='/' className={`${location.pathname === '/' ? s.active_link : ''}`}>Home</Link>
                    <Link to='/psychologists' className={`${location.pathname === '/psychologists' ? s.active_link : ''}`}>Psychologists</Link>
                    {isAuth && (
                        <Link to='/favorites' className={`${location.pathname === '/favorites' ? s.active_link : ''}`}>Favorites</Link>
                    )}
                </div>
                {!isAuth && (
                    <div className={s.btn_wrapper}>
                        {showSwitch && <ControlledSwitch />}
                        <AuthButtons/>
                    </div>
                )}
                {isAuth && (
                    <div className={s.btn_wrapper}>
                        <div className={s.head_wrap}>
                           {showSwitch && <ControlledSwitch />}
                                                <div className={s.green_wrap}>
                                                    <svg width={16} height={16}>
                                                       <use href={`${svg}#icon-user`} />
                                                    </svg>
                                                </div>
                                                <p className={s.user_name}>{userName}</p>   
                                            </div>
                        <AuthButtons handleLogout={handleLogout} />
                    </div>
                )}
                <div className={s.menu_btns}>
                    {showSwitch && <ControlledSwitch />}
                <button type='button' onClick={toggleUserMenu}>
                    <svg width={16} height={16}>
                        <use href={`${svg}#icon-user-mob`} />
                    </svg>
                </button>
                <button type='button' className={s.menu_burger} onClick={toggleNavMenu}>
                    <svg width={28} height={28}>
                        <use href={`${svg}#icon-menu`} />
                    </svg>
                </button>
            </div>
        </div>
            <UniversalMenu isUserMenuOpen={isUserMenuOpen} toggleUserMenu={toggleUserMenu} isNavMenuOpen={isNavMenuOpen} toggleNavMenu={toggleNavMenu} />
        </>
    )
}

export default Header