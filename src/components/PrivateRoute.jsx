import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/auth/slice.js";

const PrivateRoute = ({ component: Component, redirectTo = '/', redirectToAuth = '/favorites' }) => {
    
    const isAuth = useSelector(selectIsAuth)

    if (!isAuth) {
        return (
            <Navigate to={redirectTo}/>
        )
    }

    if (isAuth && window.location.pathname === '/psychologists/favorites') {
        return (
            <Navigate to={redirectToAuth}/>
        )
    }
    

    return <Component/> 
 }

export default PrivateRoute