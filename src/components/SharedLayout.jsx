import Header from "./Header/Header.jsx"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import UniversalMenu from "./UniversalMenu/UniversalMenu.jsx"

const SharedLayout = ({ children }) => {
    
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const toggleUserMenu = () => {
        setIsUserMenuOpen(prev => !prev);
    }

    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prev => !prev);
    }

    useEffect(() => {
        const isMenuOpen = isUserMenuOpen || isNavMenuOpen

        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isUserMenuOpen, isNavMenuOpen])

    const closeAllMenus = () => {
       setIsUserMenuOpen(false)
       setIsNavMenuOpen(false)
    }
    
    return (
        <>
            <header>
                <Header
                toggleUserMenu={toggleUserMenu}
                toggleNavMenu={toggleNavMenu}
                isUserMenuOpen={isUserMenuOpen}
                isNavMenuOpen={isNavMenuOpen}
            />
            </header>
            <main>
                <Suspense fallback={null}>{children}</Suspense>
            </main>
            <UniversalMenu
                isUserMenuOpen={isUserMenuOpen}
                isNavMenuOpen={isNavMenuOpen}
                toggleUserMenu={toggleUserMenu}
                toggleNavMenu={toggleNavMenu}
            />
        </>
    )
}

export default SharedLayout