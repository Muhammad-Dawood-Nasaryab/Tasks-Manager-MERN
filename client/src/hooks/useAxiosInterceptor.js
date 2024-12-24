import server from "../api/server";

import { useModal } from "../context/ModalContext";
import SessionExpiredModal from "../components/SessionExpiredModal";

export const useAxiosInterceptor = () => {
   const { openModal } = useModal();

   server.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response && error.response.status === 401) {
            openModal(<SessionExpiredModal />);
         }
         return Promise.reject(error);
      },
   );

   return server;
};
