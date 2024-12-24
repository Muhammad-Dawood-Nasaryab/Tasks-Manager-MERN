import "../styles/components/Register.css";

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

import { useAuthAPI } from "../hooks/useAuthAPI";
import { useLoading } from "../context/LoadingContext";

const Register = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState(null);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const { registerAPI } = useAuthAPI();
   const { toggleLoading } = useLoading();
   const navigate = useNavigate();

   // Check for password
   const passwordCheck = () => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
   };

   // Check for email
   const emailCheck = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   // Function that handles submission
   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent submission

      // Email and password checks
      if (!emailCheck(email)) {
         setError("Invalid email");
         return;
      };
      if (!passwordCheck(password)) {
         setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
         return;
      };
      if (password !== confirmPassword) {
         setError("Passwords do not match");
         return;
      };
      if (email.trim() === "" || username.trim() === "" || password.trim === "") {
         setError("All fields are required");
         return;
      };

      toggleLoading(true); // Set loading to true

      try {
         const { data } = await registerAPI(username, email, password);

         if (data.error) {
            setError(data.error);
            return;
         };

         setError(null);
         navigate("/login");
      } catch (error) {
         setError("Failed to register, please try later");
      } finally {
         toggleLoading(false); // Set loading to false
      };
   };

   return (
      <form onSubmit={handleSubmit} className="register-form">
         <h3 className="register-form-title">Register</h3>
         <label htmlFor="register-username-field">Username:</label>
         <input
            id="register-username-field"
            className="register-form-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
         />
         <label htmlFor="register-email-field">Email:</label>
         <input
            id="register-email-field"
            className="register-form-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
         />
         <label htmlFor="register-password-field">Password:</label>
         <div className="register-form-password">
            <input
               id="register-password-field"
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
               <MdOutlineVisibility
                  className="register-form-password-icon"
                  onClick={() => setShowPassword(false)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            ) : (
               <MdOutlineVisibilityOff
                  className="register-form-password-icon"
                  onClick={() => setShowPassword(true)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            )}
         </div>
         <label htmlFor="register-c-password-field">Confirm Password:</label>
         <div className="register-form-c-password">
            <input
               id="register-c-password-field"
               type={showConfirmPassword ? "text" : "password"}
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
               <MdOutlineVisibility
                  className="register-form-password-icon"
                  onClick={() => setShowConfirmPassword(false)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            ) : (
               <MdOutlineVisibilityOff
                  className="register-form-password-icon"
                  onClick={() => setShowConfirmPassword(true)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
               />
            )}
         </div>

         {error && <p className="error">{error}</p>}
         <button type="submit" className="register-form-submit">Register</button>
         <p className="register-to-login">
            Already have an account? <Link to={"/login"}>Login</Link>
         </p>
      </form>
   );
};

export default Register;
