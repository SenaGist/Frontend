import { useState } from "react";
import AuthContext from "./AuthContext.js";

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(localStorage.getItem("role") || null)
    const login = (newToken, newRole) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", newRole);
        setRole(newRole);
        setToken(newToken)
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setRole(null);
        setToken(null);
    }

    const isAuthenticated = !token;

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthenticated, role}}>
            {children}
        </AuthContext.Provider>
    )
}