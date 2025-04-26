import s from './Header.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.js';
import UniversalMenu from '../UniversalMenu/UniversalMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/slice.js';
import AuthButtons from '../AuthButtons/AuthButtons.jsx';
import { signOutUser } from '../../redux/auth/operations.js';

const Header = ({ toggleUserMenu, toggleNavMenu, isUserMenuOpen, isNavMenuOpen, openModal }) => {
    
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(signOutUser())
        navigate('/')
    }

    return (
        <>
        <div className={s.container}>
            <div className={s.first_wrapper}>
                <p className={s.logo}>psychologists.<span>services</span></p>
                <div className={s.links_wrapper}>
                    <Link to='/' className={`${location.pathname === '/' ? s.active_link : ''}`}>Home</Link>
                    <Link to='/psychologists' className={`${location.pathname === '/psychologists' ? s.active_link : ''}`}>Psychologists</Link>
                </div>
            </div>
                {!isAuth && (
                    <div className={s.btn_wrapper}>
                        <AuthButtons openModal={openModal}/>
                    </div>
                )}
                {isAuth && (
                    <div className={s.btn_wrapper}>
                        <AuthButtons handleLogout={handleLogout}/>
                    </div>
                )}
            <div className={s.menu_btns}>
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