
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children})=>{
    const {authentication} = useSelector((store)=>store.auth)
    if (!authentication) {
        return <Navigate to={"/login"} />
        
    }
    return children
}
export const AuthenticatedUser = ({children}) =>{
    const {authentication} = useSelector((store)=>store.auth)
    if (authentication) {
        return <Navigate to={"/"}/>
    }
    return children
}
export const InstructorRoute = ({children})=>{
    const {user, authentication} = useSelector((store)=>store.auth)
    if (!authentication) {
        return <Navigate to={"/login"} />
    }
    if (user?.role !=="instructor") {
        return <Navigate to={"/home"} />
    }
    return children
}
export const AdminRoute = ({children})=>{
    const {user, authentication} = useSelector((store)=>store.auth)
    if (!authentication) {
        return <Navigate to={"/login"} />
    }
    if (user?.role !=="admin") {
        return <Navigate to={"/home"} />
    }
    return children
}