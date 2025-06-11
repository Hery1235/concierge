import React from "react";
import Navbar from "../components/Navbar";
import { useAppContext } from "../context/AppContext";
import { Outlet } from "react-router-dom";

import { useClerk, SignInButton, UserButton } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
import Residents from "../components/Residents";
const Dashboard = () => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      {user ? (
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 p-4 pt-10 md:px-10 h-full">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div
            onClick={openSignIn}
            className="flex p-6 border-gray-300 border rounded-lg text-lg 
      text-bold cursor-pointer backdrop-blur-xl font-playfair"
          >
            Admin's Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
