import * as authApi from "../api/authApi"
import { children, createContext, useEffect, useState, useContext } from "react"

const AuthContext  = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const data = await authApi.getProfile();

            setUser(data.user);
        } catch (error) {
            setUser(null);
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        checkAuth();
    },[]);

    const login = async (email, password) => {

            await authApi.login(email, password); 
           const data = await authApi.getProfile();
           setUser(data.user);

    }

    const logout = async () => {
            await authApi.Logout();
            setUser(null);
    };

    return(
        <AuthContext.Provider
            value={{
            user, login, logout, checkAuth, setUser, loading,
        }}> {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);