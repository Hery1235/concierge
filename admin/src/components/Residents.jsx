import React from "react";
import { flatsAndResidentsDummyData } from "../assets/assets";

const Residents = () => {
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
              <th className="py-3 px-4 text-gray-800 font-medium">Site</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Address</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Phone</th>
            </tr>
          </thead>
          <tbody>
            {flatsAndResidentsDummyData.map((flat) =>
              flat.residents.map((resident, index) => (
                <tr key={resident._id}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {flat.site.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {flat.flatAddress}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {resident.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {resident.email}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {resident.phone}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Residents;
