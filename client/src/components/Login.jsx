import "../styles/components/Login.css";

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

import { useAuthAPI } from "../hooks/useAuthAPI";
import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [showPassword, setShowPassword] = useState(false);

   const { loginAPI } = useAuthAPI();
   const { loginUser } = useAuth();
   const { toggleLoading } = useLoading();

   // Function that handles submition of form
   const handleSubmit = async (e) => {
      e.preventDefault();  // Prevent submission

      // Email chack for password
      if (!emailCheck(email)) {
         setError("Invalid email");
         return;
      };

      toggleLoading(true); // Set loading to true

      try {
         const { data } = await loginAPI(email, password); // Try to login and extract data

         if (data.error) {  // If error, display it
            setError(data.error);
            console.log("Error", data.error);
            return; // End the function
         };

         loginUser(data.accessToken); // Save token
      } catch (error) {
         setError("Failed to login, Please try later");
      } finally {
         toggleLoading(false); // Set loading to false
      };
   };

   // Function to check if email is valid
   const emailCheck = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   return (
      <form onSubmit={handleSubmit} className="login-form">
         <h3 className="login-form-title">Login</h3>

         <label htmlFor="login-email-field">Email:</label>
         <input
            id="login-email-field"
            className="login-form-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
         />

         <label htmlFor="login-password-field">Password:</label>
         <div className="login-form-password">
            <input
               id="login-password-field"
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               autoComplete="off"
            />
            {showPassword ? (
               <MdOutlineVisibility
                  className="login-form-password-icon"
                  onClick={() => setShowPassword(false)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            ) : (
               <MdOutlineVisibilityOff
                  className="login-form-password-icon"
                  onClick={() => setShowPassword(true)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            )}
         </div>

         {error && <p className="error">{error}</p>}
         <button type="submit" className="login-form-submit">Login</button>
         <p className="login-to-register">
            Don't have an account? <Link to={"/register"}>Register</Link>
         </p>
      </form>
   );
};

export default Login;
