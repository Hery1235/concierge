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
  const [buildings, setBuildings] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [residents, setResidents] = useState(null);
  const [parcelsData, setParcelsData] = useState(null);
  const [showCollectionDetailPage, setShowCollectionDetailPage] =
    useState(false);
  const [parcelId, setParcelId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(null);
  // Checking if the user is admin or not
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.user.role === "concierge") {
        setIsAdmin(true);
        setLoggedInUserName(data.user.name);
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

  // Getting building for concierge
  const getBuildings = async () => {
    try {
      const { data } = await axios.get(
        "/api/building/getbuildingforconcierge",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setBuildings(data.buildings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get residenst
  const getResidents = async () => {
    try {
      const { data } = await axios.get("/api/resident/getResidentsForSite", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setResidents(data.residents);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Get parcels for site
  const getParcels = async () => {
    try {
      const { data } = await axios.get("/api/parcel/allparcelsforsite", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setParcelsData(data.parcels);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
      getBuildings();
      getResidents();
      getParcels();
    }
  }, [user]);

  const value = {
    user,
    getToken,
    axios,
    toast,
    isAdmin,
    navigate,
    checkingAdmin,
    residents,
    loggedInUserName,
    getBuildings,
    buildings,
    getResidents,
    parcelsData,
    getParcels,
    setShowCollectionDetailPage,
    showCollectionDetailPage,
    setParcelId,
    parcelId,
    loader,
    setLoader,
    setShowCodeInput,
    showCodeInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

function useAppContext() {
  return useContext(AppContext);
}
export { useAppContext };
//
