import "../styles/pages/LoginPage.css";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const LoginPage = () => {
   const navigate = useNavigate();
   const { isAuthenticated, logoutUser } = useAuth();
   const { isLoading, toggleLoading } = useLoading();

   useEffect(() => {
      if (isAuthenticated) {
         navigate("/");
      };
      if (isLoading) {
         toggleLoading();  
      }
   }, [isAuthenticated, navigate]);


   if (isAuthenticated) {
      return (
         <div className="login-page-msg">
            <p>Already logged in. <a href="/" onClick={ logoutUser }>Logout?</a></p>
         </div>
      );
   };

   return (
      <div className="login-card-container">
         <Login />
      </div>
   );
};

export default LoginPage;
