import React, { useContext, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Parcels from "./components/Parcels";
import AddParcel from "./components/AddParcel";
import Residents from "./components/Residents";
import AddResident from "./components/AddResident";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import ComponentError from "./components/ComponentError";
import CollectionDetails from "./components/collectionDetails";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showCollectionDetailPage } = useAppContext();
  useEffect(() => {}, []);
  return (
    <div className="">
      <Navbar />
      {showCollectionDetailPage && <CollectionDetails />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/parcels" element={<Parcels />} />
          <Route path="/addparcel" element={<AddParcel />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/addresident" element={<AddResident />} />

          {/* <Route path="/addkeys" element={<Addkeys />} />
          <Route path="/keys" element={<Keys />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/errorlogin" element={<ComponentError />} />
      </Routes>
    </div>
  );
};

export default App;
