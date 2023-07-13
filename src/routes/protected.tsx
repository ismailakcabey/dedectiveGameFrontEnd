import { Navigate, Outlet } from "react-router-dom"
import { EKEYS } from "../config"
import { LocalStorageUtils } from "../utils/localstorage"
import Login from "../pages/auth/login"

const useAuth = () => {
    const user = LocalStorageUtils.getItem(EKEYS.userKey)
    return user
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes