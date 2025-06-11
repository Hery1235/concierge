import { createContext, useContext } from "react";

import { useUser, useAuth } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const value = {
    user,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
