import Header from "./Header/Header.jsx"
import { Suspense } from "react"

const SharedLayout = ({children}) => {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={null}>{children}</Suspense>
            </main>
        </>
    )
}

export default SharedLayout