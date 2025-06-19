import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import SiteSearchBtns from "./SiteSearchBtns";

const MyEmployes = () => {
  const { axios, getToken } = useAppContext();
  const [allEmployes, setAllEmployes] = useState(null);

  const getAllEmploye = async () => {
    try {
      const { data } = await axios.get("/api/user/allusers", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setAllEmployes(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllEmploye();
  }, []);

  return (
    <div className="flex flex-col">
      <SiteSearchBtns />
      <h1 className="text-3xl ">All Employes</h1>

      <div className="flex items-center mt-4 justify-between ">
        <p>
          Total <span>{allEmployes?.length - 1 || 0}</span>
        </p>
      </div>

      <div className="max-w-6xl w-full text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Picture</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Full Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Site</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {allEmployes
              ?.filter((employe) => employe.role !== "admin")
              .map((employe, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 w-7 h-7 rounded-full text-gray-700 border-t border-gray-300">
                    <img
                      src={employe.image || "/placeholder.jpg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {employe.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {employe.site?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {employe.email}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {employe.createdAt
                      ? new Date(employe.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployes;
