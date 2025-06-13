import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [sites, setSites] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  // Checking if the user is admin or not
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false); // done checking
    }
  };

  // Getting all the sites when pages loads
  const getSites = async () => {
    try {
      const { data } = await axios.get("/api/site/getsites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setSites(data.sites);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getSites();
      getUser();
    }
  }, [user]);

  const value = {
    user,
    getToken,
    axios,
    toast,
    sites,
    isAdmin,
    navigate,
    checkingAdmin,
    getSites,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function useAppContext() {
  return useContext(AppContext);
}
export { useAppContext };
//
