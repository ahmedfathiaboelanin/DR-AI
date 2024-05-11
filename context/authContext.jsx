import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const login = (token) => {
        setToken(token);
        setIsLoggedIn(true);
    }
    const logout = () => {
        setToken(null);
        setIsLoggedIn(false);
    }
    const value = {
        isLoggedIn,
        login,
        logout,
        token,
        userData,
        setUserData
    }
    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}