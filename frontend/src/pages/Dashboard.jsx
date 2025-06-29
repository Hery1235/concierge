import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  const { user, isAdmin, checkingAdmin } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!checkingAdmin && !isAdmin) {
      toast.error("Access denied. Signing out...");

      navigate("/errorlogin");
    }
  }, [user, isAdmin, checkingAdmin, navigate]);

  if (checkingAdmin) {
    return <div>Loading...</div>; // or your spinner/loading indicator
  }

  if (!user || !isAdmin) {
    // Render nothing while redirect happens
    return null;
  }

  return (
    <div className=" w-full h-screen ">
      <Toaster />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
