import { Navigate, Outlet } from "react-router-dom"
import { EKEYS } from "../config"
import { LocalStorageUtils } from "../utils/localstorage"

const useAuth = () => {
    const user = LocalStorageUtils.getItem(EKEYS.userKey)
    return user
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes