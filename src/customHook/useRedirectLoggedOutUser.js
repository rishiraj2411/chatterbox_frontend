import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/service/authService";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      try {
        const isLoggedIn = await authService.getLoginStatus();
        // console.log(isLoggedIn);

        if (!isLoggedIn) {
          toast.info("Session expired, please login to continue.");
          navigate(path);
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path]);
};

export default useRedirectLoggedOutUser;
