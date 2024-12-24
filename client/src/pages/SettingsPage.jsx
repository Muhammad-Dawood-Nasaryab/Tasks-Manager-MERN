import "../styles/pages/SettingsPage.css";

import React from "react";
import { useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
   const { logoutUser, isAuthenticated } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate("/");
      };
   }, []);

   return (
      <>
         <h2 className="dashboard-page-heading">Settings</h2>
         <div className="settings-container">
            <div className="settings-main">
               <div className="logout">
                  Logout: {" "}
                  <Link to={"/"} onClick={logoutUser}>
                     <button className="logout-button">
                        Logout {" "}
                        <LuLogOut style={{ fontSize: "15px",  }} />
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default SettingsPage;
