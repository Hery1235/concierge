import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Parcels from "./components/Parcels";
import AddParcel from "./components/AddParcel";
import Residents from "./components/Residents";
import AddResident from "./components/AddResident";
import AddSite from "./components/AddSite";
import Sites from "./components/Sites";
import MyEmployes from "./components/MyEmployes";
import AddEmploye from "./components/AddEmploye";
import Keys from "./components/Keys";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import ComponentError from "./components/ComponentError";
import AddBuilding from "./components/AddBuilding";
import Buildings from "./components/Buildings";
import ScreenSizeWarning from "./components/ScreenSizeWarning"; // ✅ import the warning component

const App = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1227);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1227);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Show warning on small screens
  if (!isLargeScreen) {
    return <ScreenSizeWarning />;
  }

  return (
    <div>
      <Navbar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/parcels" element={<Parcels />} />
          <Route path="/addparcel" element={<AddParcel />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/addresident" element={<AddResident />} />
          <Route path="/addsite" element={<AddSite />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/myemployes" element={<MyEmployes />} />
          <Route path="/addemploye" element={<AddEmploye />} />
          <Route path="/keys" element={<Keys />} />
          <Route path="/addbuilding" element={<AddBuilding />} />
          <Route path="/buildings" element={<Buildings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/errorlogin" element={<ComponentError />} />
      </Routes>
    </div>
  );
};

export default App;
