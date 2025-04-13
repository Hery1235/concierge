import React from "react";
import "./Home.css";
import { Routes, Route } from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";
import Addparcels from "../../components/Addparcels/Addparcels";
import Viewparcels from "../../components/Viewparcels/Viewparcels";
import AddKey from "../../components/AddKey/AddKey";
import ViewKeys from "../../components/ViewKeys/ViewKeys";
import AddBuilding from "../../components/AddBuilding/AddBuilding";

const Home = () => {
  return (
    <div className="home">
      <Tabs />
      <Routes>
        <Route path="/addparcels" element={<Addparcels />} />
        <Route path="/addbuilding" element={<AddBuilding />} />
        <Route path="/viewparcels" element={<Viewparcels status={true} />} />
        <Route path="/delivered" element={<Viewparcels status={false} />} />
        <Route path="/addkey" element={<AddKey />} />
        <Route path="/viewkeys" element={<ViewKeys status={true} />} />
        <Route path="/deliveredkeys" element={<ViewKeys status={false} />} />
      </Routes>
    </div>
  );
};

export default Home;
