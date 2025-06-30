import React from "react";
import { sitesDummyData } from "../assets/assets";
import bookingIcon from "../assets/totalBookingIcon.svg";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import SiteSearchBtns from "./SiteSearchBtns";

const Sites = () => {
  const { sites, getSites } = useAppContext();

  useEffect(() => {
    getSites();
  }, []);
  return (
    <div className="flex flex-wrap flex-col gap-2">
      <h1 className="text-3xl">Sites..</h1>
      <div className="flex mt-6 gap-2 border-gray-300 border w-44 p-4 rounded-sm">
        <img src={bookingIcon} alt="bookingicon" />
        <div>
          <h1>Total Sites </h1>
          <p>{sites.length}</p>
        </div>
      </div>
      <div
        className="max-w-3xl w-full text-left border border-gray-300 
      rounded-lg max-h-80 overflow-y-scroll mt-6"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Site Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Site Address
              </th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {site.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {site.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sites;
Sites;
