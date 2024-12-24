import React from "react";

import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

   const loginUser = (token) => {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
   };

   const logoutUser = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
         { children }
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   return useContext(AuthContext);
};
