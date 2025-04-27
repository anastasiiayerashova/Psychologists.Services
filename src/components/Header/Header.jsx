import s from './Header.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.js';
import UniversalMenu from '../UniversalMenu/UniversalMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectName } from '../../redux/auth/slice.js';
import AuthButtons from '../AuthButtons/AuthButtons.jsx';
import { signOutUser } from '../../redux/auth/operations.js';
import ControlledSwitch from '../ControlledSwitch/ControlledSwitch.jsx';
import { useState, useEffect } from 'react';

const Header = ({ toggleUserMenu, toggleNavMenu, isUserMenuOpen, isNavMenuOpen, openModal }) => {
    
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const userName = useSelector(selectName)
    const navigate = useNavigate()
    const [showSwitch, setShowSwitch] = useState(false)

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
                <p className={s.logo}>psychologists.<span>services</span></p>
                <div className={s.links_wrapper}>
                    <Link to='/' className={`${location.pathname === '/' ? s.active_link : ''}`}>Home</Link>
                    <Link to='/psychologists' className={`${location.pathname === '/psychologists' ? s.active_link : ''}`}>Psychologists</Link>
                    {isAuth && (
                        <Link to='/favorites' className={`${location.pathname === '/favorites' ? s.active_link : ''}`}>Favorites</Link>
                    )}
                </div>
            </div>
                {!isAuth && (
                    <div className={s.btn_wrapper}>
                        {showSwitch && <ControlledSwitch />}
                        <AuthButtons openModal={openModal}/>
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
                        <AuthButtons handleLogout={handleLogout}/>
                    </div>
                )}
                <div className={s.menu_btns}>
                    {showSwitch && <ControlledSwitch />}
                <button onClick={toggleUserMenu}>
                    <svg width={16} height={16}>
                        <use href={`${svg}#icon-user-mob`} />
                    </svg>
                </button>
                <button className={s.menu_burger} onClick={toggleNavMenu}>
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