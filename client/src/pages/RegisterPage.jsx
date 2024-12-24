import "../styles/pages/RegisterPage.css";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Register from "../components/Register";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const RegisterPage = () => {
   const navigate = useNavigate();
   const { isAuthenticated, logoutUser } = useAuth();
   const { isLoading, toggleLoading } = useLoading();

   useEffect(() => {
      if (isAuthenticated) {
         navigate("/");
      };
      if (isLoading) {
         toggleLoading();  
      };
   }, [isAuthenticated, navigate]);

   if (isAuthenticated) {
      return (
         <div className="login-page-msg">
            <p>Already logged in. <a href="/" onClick={ logoutUser }>Logout?</a></p>
         </div>
      );
   };

   return (
      <div className="register-card-container">
         <Register />
      </div>
   );
};

export default RegisterPage;
