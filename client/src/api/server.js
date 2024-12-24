import axios from "axios";

// Setting up base route
const server = axios.create({ 
   baseURL: import.meta.env.VITE_API 
});

server.interceptors.request.use((req) => {
   const token = localStorage.getItem("token");
   if (token) {
      req.headers.Authorization = `Bearer ${token}`;
   };
   return req;
});

export default server;