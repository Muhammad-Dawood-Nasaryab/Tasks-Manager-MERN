import server from "../api/server";

export const useAuthAPI = () => {
   /**
    * Sends data to the server to verify and get verification token
    * @route - POST  /api/auth/login
    * @param {String} email - The email address that user provided
    * @param {String} password - The password of the email provided
    */
   const loginAPI = async (email, password) => {
      try {
         const body = {
            email: email,
            password: password,
         };
         const { data } = await server.post("/auth/login", body);
   
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };

   /**
    * Sends data to the server to make a new user
    * @route - POST /api/auth/register
    * @param {String} username - Username of user
    * @param {String} email - Email that user has provided
    * @param {String} password - Password that user has set
    */
   const registerAPI = async (username, email, password) => {
      try {
         const body = {
            username: username,
            email: email,
            password: password,
         };
         const { data } = await server.post("/auth/register", body);
         
         return data;
      } catch (error) {
         const { response } = error;
         return response;
      };
   };

   return { loginAPI, registerAPI };
};

