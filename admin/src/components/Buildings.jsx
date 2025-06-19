import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

import bookingIcon from "../assets/totalBookingIcon.svg";
import SiteSearchBtns from "./SiteSearchBtns";
const Buildings = () => {
  const { buildings, getBuildings } = useAppContext();
  console.log(buildings);

  useEffect(() => {
    getBuildings();
  }, []);
  return (
    <div className="flex flex-wrap flex-col gap-2">
      <SiteSearchBtns />
      <h1 className="text-3xl">All Buildings..</h1>
      <div className="flex mt-6 gap-2 border-gray-300 border w-44 p-4 rounded-sm">
        <img src={bookingIcon} alt="bookingicon" />
        <div>
          <h1 className="text-xs">Total Buildings We Cover </h1>
          <p>{buildings.length}</p>
        </div>
      </div>
      <div
        className="max-w-3xl w-full text-left border border-gray-300 
      rounded-lg max-h-80 overflow-y-scroll mt-6"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Building Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Total No of Flats{" "}
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">Site </th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((building, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {building.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {building.totalFLats}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {building.site.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Buildings;
