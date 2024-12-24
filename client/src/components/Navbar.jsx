import "../styles/components/Navbar.css";

import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const Navbar = () => {
   const { isAuthenticated } = useAuth();
   const { isLoading } = useLoading();

   return (
      <>
         <nav>
            <h1>Tasks Manager</h1>
            <ul>
               <li>
                  <Link to={"/"}>Home</Link>
               </li>
               {isAuthenticated ? (
                  <>
                     <li>
                        <Link to={"/dashboard"}>Dashboard</Link>
                     </li>
                     <li>
                        <Link to={"/settings"}>Settings</Link>
                     </li>
                  </>
               ) : (
                  <>
                     <li>
                        <Link to={"/login"}>Login</Link>
                     </li>
                     <li>
                        <Link to={"/register"}>Register</Link>
                     </li>
                  </>
               )}
            </ul>
         </nav>
         <div className="empty-space">
            {isLoading && (
               <div className="navbar-loading-line"></div>
            )}
         </div>
      </>
   );
};

export default Navbar;
