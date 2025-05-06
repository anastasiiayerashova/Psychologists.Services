import s from './UniversalMenu.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { svg } from '../../constants/index.ts'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectName } from '../../redux/auth/slice.ts'
import { signOutUser } from '../../redux/auth/operations.ts'
import AuthButtons from '../AuthButtons/AuthButtons.tsx'
import ControlledSwitch from '../ControlledSwitch/ControlledSwitch.tsx'
import { UniversalMenuProps } from '../../types/PropsTypes.ts'
import { AppDispatch, RootState } from '../../redux/store.ts'
import { resetFilters } from '../../redux/filters/slice.ts'
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react'


const UniversalMenu = ({ isUserMenuOpen, toggleUserMenu, isNavMenuOpen, toggleNavMenu, setIsUserMenuOpen, showAlert }: UniversalMenuProps) => {
    
    const location = useLocation()
    const isAuth = useSelector<RootState, boolean>(selectIsAuth)
    const userName = useSelector<RootState, string | null>(selectName)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const contentRef = useRef<HTMLDivElement>(null)
    const notAuthContentRef = useRef<HTMLDivElement>(null)
    const authContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
       if (isUserMenuOpen && !isAuth && notAuthContentRef.current) {
          gsap.from(notAuthContentRef.current.children, {
             y: 50,
             opacity: 0,
             duration: 0.5,
             stagger: 0.2,
             ease: 'power2.out',
          })
        }
    }, [isUserMenuOpen, isAuth])

    useEffect(() => {
       if (isUserMenuOpen && isAuth && authContentRef.current) {
          gsap.from(authContentRef.current.children, {
             y: 50,
             opacity: 0,
             duration: 0.5,
             stagger: 0.2,
             ease: 'power2.out',
           })
        }
    }, [isUserMenuOpen, isAuth])
    
    useEffect(() => {
        if (isNavMenuOpen && contentRef.current) {
            const tl = gsap.timeline()
            tl.from(contentRef.current.children, {
               y: 50,
               opacity: 0,
               duration: 0.5,
               stagger: 0.2,
               ease: 'power2.out',
            })
        }
    }, [isNavMenuOpen])

    const handleLogout = async (): Promise<void> => {
        try {
            await dispatch(signOutUser()).unwrap()
            dispatch(resetFilters())
            setIsUserMenuOpen?.(false)
            navigate('/')
        }
        catch (e: unknown) {
            console.log('Error during logout:', e)
        }
    }
    

    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
          if (isNavMenuOpen) toggleNavMenu()
          if (isUserMenuOpen) toggleUserMenu()
        }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
       document.removeEventListener('keydown', handleKeyDown)
    }
    }, [isNavMenuOpen, isUserMenuOpen, toggleNavMenu, toggleUserMenu])


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
                    <div ref={notAuthContentRef} className={s.content}>
                        <AuthButtons />
                    </div>
                )}

                 {isUserMenuOpen && isAuth && (
                    <div ref={authContentRef} className={s.content}>
                        <AuthButtons handleLogout={handleLogout} showAlert={showAlert} />
                    </div>
                )}

                {isNavMenuOpen && (
                    <div ref={contentRef} className={s.content}>
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