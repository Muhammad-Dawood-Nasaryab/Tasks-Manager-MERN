import React from "react";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);

   const toggleLoading = (status) => {
      setIsLoading(status);
   };

   return (
      <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
         { children }
      </LoadingContext.Provider>
   );
};

export const useLoading = () => {
   return useContext(LoadingContext);
};
