import {Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/authContext"

const ProtectedRoute = () => {

    const { user, loading} = useAuth();

    if(loading){
        return <p>loading...</p>
    }

    if(!user){
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
};

export default ProtectedRoute;