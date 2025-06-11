import React from "react";
import { parcelsDummyData } from "../assets/assets";

const Parcels = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl ">All Parcels</h1>
      {/*------------Search Area--------------------- */}
      <div className="flex items-center mt-4 justify-between ">
        <p>
          Total Picked <span>0</span>
        </p>
        <p>
          Total Pending <span>0</span>
        </p>
        <div className="flex gap-2 items-center">
          <p>Search: </p>
          <input
            className="border border-gray-300 px-2 py-1 rounded-full 
            text-sm outline-none w-30"
            placeholder="Type Here"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      {/*------------Parcels Table --------------------- */}
      <div
        className="max-w-6xl w-full text-left border border-gray-300 
      rounded-lg max-h-80 overflow-y-scroll mt-6"
      >
        <table className="w-full">
          {/*------------Table Head --------------------- */}
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Address</th>
              <th className="py-3 px-4 text-gray-800 font-medium">T No.</th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Recived At
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">Picked At</th>
            </tr>
          </thead>
          {/*------------Table Body --------------------- */}
          <tbody>
            {parcelsDummyData.map((parcel, index) => (
              <tr>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.flat.flatAddress}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.trackingNumber}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {new Date(parcel.receivedAt).toLocaleDateString()}
                </td>

                <td
                  className="py-3 px-4 text-gray-700 border-t border-gray-300 
                   
                  "
                >
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto ${
                      parcel.collected
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-yellow-600"
                    }`}
                  >
                    {parcel.pickedAt
                      ? new Date(parcel.pickedAt).toLocaleDateString()
                      : "Awaiting"}
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

export default Parcels;
