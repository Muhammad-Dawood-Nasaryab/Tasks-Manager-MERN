import axios from "axios";

// Setting up base route
const server = axios.create({ 
   baseURL: import.meta.env.VITE_API 
});

// Interceptor for adding access token
server.interceptors.request.use((req) => {
   const token = localStorage.getItem("token");
   if (token) {
      req.headers.Authorization = `Bearer ${token}`;
   };
   return req;
});

// Response interceptor to handle token expiration
server.interceptors.response.use(
   (res) => res, 
   async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         
         try {
            const { data } = await axios.post(
               `${import.meta.env.VITE_API}/auth/refresh`,
               {},
               { withCredentials: true }
            );

            const { accessToken } = data;
            localStorage.setItem("accessToken", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return server(originalRequest);
         } catch (error) {
            console.error("Failed to refresh token:", refreshError.response.data);
            window.location.href = "/login";
         };
      };

      return Promise.reject(error);
   });

export default server;
