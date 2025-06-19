import React from "react";
import { useAppContext } from "../context/AppContext";

const SiteSearchBtns = () => {
  const { sites } = useAppContext();
  return (
    <div className="flex items-center gap-4 justify-center">
      {sites.map((site, index) => (
        <div
          className="px-2 py-1 rounded-lg items-center border border-gray-300 hover:px-3 hover:py-2 hover:bg-gray-300 transition-all duration-500 cursor-pointer"
          key={index}
        >
          {site.name}
        </div>
      ))}
      <div className="px-2 py-1 rounded-lg items-center border border-gray-300 hover:px-3 hover:py-2 hover:bg-gray-300 transition-all duration-500 cursor-pointer">
        Clear All
      </div>
    </div>
  );
};

export default SiteSearchBtns;
