import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sideBarItems = [
    { name: "Sites", path: "/sites" },
    { name: "Add Site", path: "/addsite" },
    { name: "My Employes", path: "/myemployes" },
    { name: "Add Employe", path: "/addemploye" },
    { name: "Residents", path: "/residents" },
    { name: "Parcels ", path: "/parcels" },
    { name: "Keys ", path: "/keys" },
    { name: "Buildings ", path: "/buildings" },
    { name: "Add Building ", path: "/addbuilding" },
  ];
  return (
    <div
      className="w-64 flex flex-col border-r border-gray-300 text-base
  items-center h-full"
    >
      {sideBarItems.map((item, index) => (
        <NavLink
          className={({ isActive }) => `flex justify-center py-3 gap-3 w-full 
          ${
            isActive
              ? "border-r border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
              : "hover:bg-gray-100/90 border-white text-gray-700"
          }`}
          to={item.path}
          key={index}
        >
          <p className="">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
