import React from "react";
import { residents } from "../assets/assets";
import SiteSearchBtns from "./SiteSearchBtns";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Residents = () => {
  const { allResidentsData, getAllResidents } = useAppContext();

  useEffect(() => {
    getAllResidents();
  }, []);
  return (
    <div className="flex flex-col">
      <SiteSearchBtns />
      <h1 className="text-3xl">Residents</h1>
      <div
        className="max-w-6xl w-full text-left border border-gray-300 
            rounded-lg max-h-80 overflow-y-scroll mt-6"
      >
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Flat</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Building</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Site</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Phone</th>
            </tr>
          </thead>
          <tbody>
            {allResidentsData.map((resident, index) => (
              <tr key={resident._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.flatNumber}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.building.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.building.site.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.email}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Residents;
