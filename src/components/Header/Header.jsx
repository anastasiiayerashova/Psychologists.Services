import s from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import UniversalMenu from '../UniversalMenu/UniversalMenu.jsx';

const Header = ({toggleUserMenu, toggleNavMenu, isUserMenuOpen, isNavMenuOpen}) => {

    const svg = '/sprite.svg'
    const location = useLocation()

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
            <div className={s.btn_wrapper}>
                <button className={s.log_btn}>Log In</button>
                <button className={s.reg_btn}>Registration</button>
            </div>
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