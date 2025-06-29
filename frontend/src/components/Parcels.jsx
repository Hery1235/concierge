import React from "react";

import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Parcels = () => {
  const { getParcels, parcelsData, setShowCollectionDetailPage, setParcelId } =
    useAppContext();

  useEffect(() => {
    getParcels();
  }, []);

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
      rounded-lg max-h-120 overflow-y-scroll mt-6 relative"
      >
        <table className="w-full ">
          {/*------------Table Head --------------------- */}
          <thead className="bg-gray-50 ">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Flat No.</th>

              <th className="py-3 px-4 text-gray-800 font-medium">Building</th>
              <th className="py-3 px-4 text-gray-800 font-medium">T No.</th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Recived At
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">Picked At</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Picked By</th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Re by / Han By
              </th>
            </tr>
          </thead>
          {/*------------Table Body --------------------- */}
          <tbody>
            {parcelsData.map((parcel, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.resident.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.resident.flatNumber}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.resident.building.name}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.uniqueId}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>

                <td
                  className="py-3 px-4 text-gray-700 border-t border-gray-300 
                   
                  "
                >
                  <button
                    className={`py-1 px-3 text-xs rounded-full mx-auto ${
                      parcel.pickedAt
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-yellow-600"
                    }`}
                  >
                    {parcel.pickedAt
                      ? new Date(parcel.pickedAt).toLocaleDateString()
                      : "Awaiting"}
                  </button>
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.pickedBy ? (
                    parcel.pickedBy
                  ) : (
                    <button
                      onClick={() => {
                        setParcelId(parcel._id);
                        setShowCollectionDetailPage(true);
                      }}
                      className="text-sm px-2 py-1.5 rounded-sm bg-amber-200 text-yellow-600 cursor-pointer hover:bg-green-500 hover:text-white"
                    >
                      Picking Up
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {parcel.recivedBy} / {parcel.handedOverBy}
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
