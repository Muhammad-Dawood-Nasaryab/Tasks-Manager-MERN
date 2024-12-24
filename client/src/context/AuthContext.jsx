import React from "react";

import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

   const loginUser = (token) => {
      localStorage.setItem("accessToken", token);
      setIsAuthenticated(true);
   };

   const setRefreshToken = (refreshToken) => {
      document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
   };

   const logoutUser = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser, setRefreshToken }}>
         { children }
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
