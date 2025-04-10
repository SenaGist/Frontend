import { useState } from "react";
import AuthContext from "./AuthContext.js";
export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null)
    const [userId, setUserId] = useState(localStorage.getItem("id") || null);

    const login = (newToken, newRole, newUserId) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", newRole);
        localStorage.setItem("id", newUserId);
        setRole(newRole);
        setToken(newToken);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");
        setRole(null);
        setToken(null);
        setUserId(null);
    }

    const isAuthenticated = !token;

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthenticated, role, userId}}>
            {children}
        </AuthContext.Provider>
    )
}