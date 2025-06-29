import React from "react";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Residents = () => {
  const { getResidents, residents } = useAppContext();
  useEffect(() => {
    getResidents();
  }, []);
  return (
    <div className="flex flex-col">
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

              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Phone</th>
              <th className="py-3 px-4 text-gray-800 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident, index) => (
              <tr key={resident._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.flatNumber}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.building.name}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.name}
                </td>
                <td
                  className={`py-3 px-4 text-gray-700 border-t border-gray-300 ${
                    resident.email ? "" : "text-red-400"
                  }`}
                >
                  {resident.email ? resident.email : "No Email"}
                </td>
                <td
                  className={`py-3 px-4 text-gray-700 border-t border-gray-300 ${
                    resident.phoneNumber ? "" : "text-red-400"
                  }`}
                >
                  {resident.phoneNumber ? resident.phoneNumber : "No Phone "}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  <button className="text-green-400 cursor-pointer">
                    Edit{" "}
                  </button>
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
Residents;
