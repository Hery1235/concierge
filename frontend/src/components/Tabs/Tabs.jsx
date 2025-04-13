import React from "react";
import "./Tabs.css";
import { Link } from "react-router-dom";

const Tabs = () => {
  return (
    <div className="sidebar">
      <Link to="/addparcels" className="sidebar-item">
        <p>Add Parcel</p>
      </Link>
      <Link to="/addbuilding" className="sidebar-item">
        <p>Add Building</p>
      </Link>
      <Link to="/viewparcels" className="sidebar-item">
        <p>delivered Parcels</p>
      </Link>
      <Link to="/delivered" className="sidebar-item">
        <p>UnDelivered Parcels</p>
      </Link>
      <Link to="/addkey" className="sidebar-item">
        <p>Add Key</p>
      </Link>
      <Link to="/viewkeys" className="sidebar-item">
        <p>Delivered Keys</p>
      </Link>
      <Link to="/deliveredkeys" className="sidebar-item">
        <p>UnDelivered Keys</p>
      </Link>
    </div>
  );
};

export default Tabs;
