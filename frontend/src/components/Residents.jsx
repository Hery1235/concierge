import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Residents = () => {
  const UpdateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );

  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );

  const CancelIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  const [editIndex, setEditIndex] = useState(null);
  const { getResidents, residents, axios, toast, getToken } = useAppContext();

  const [updateResidentDetails, setUpdatedResidentDetails] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const onChangeHandler = (e) => {
    setUpdatedResidentDetails({
      ...updateResidentDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Delete Resident
  const clickHandler = async (id) => {
    try {
      const residentId = id;

      const { data } = await axios.post(
        "/api/resident/delete",
        { residentId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getResidents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete resident");
    }
  };

  // Update Resident
  const updateResident = async (residentId) => {
    try {
      const payload = {
        residentId,
        name: updateResidentDetails.name.trim(),
        email: updateResidentDetails.email.trim(),
        phoneNumber: updateResidentDetails.phoneNumber.trim(),
      };

      const { data } = await axios.post("/api/resident/update", payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setEditIndex(null);
        getResidents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl">Residents</h1>
      <div className="max-w-6xl w-full text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Flat</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Building</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Email</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Phone</th>
              <th className="py-3 px-4 text-gray-800 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.flatNumber}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {resident.building.name}
                </td>

                {/* Name */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {editIndex === resident._id ? (
                    <input
                      className="text-gray-700 border-b border-gray-300 rounded outline-none"
                      type="text"
                      name="name"
                      value={updateResidentDetails.name}
                      onChange={onChangeHandler}
                    />
                  ) : (
                    resident.name
                  )}
                </td>

                {/* Email */}
                <td
                  className={`py-3 px-4 text-gray-700 border-t border-gray-300 ${
                    resident.email ? "" : "text-red-400"
                  }`}
                >
                  {editIndex === resident._id ? (
                    <input
                      className="text-gray-700 border-b border-gray-300 rounded outline-none"
                      type="email"
                      name="email"
                      value={updateResidentDetails.email}
                      onChange={onChangeHandler}
                      placeholder="Email"
                    />
                  ) : (
                    resident.email || "No Email"
                  )}
                </td>

                {/* Phone */}
                <td
                  className={`py-3 px-4 text-gray-700 border-t border-gray-300 ${
                    resident.phoneNumber ? "" : "text-red-400"
                  }`}
                >
                  {editIndex === resident._id ? (
                    <input
                      className="text-gray-700 border-b border-gray-300 rounded outline-none"
                      type="tel"
                      name="phoneNumber"
                      value={updateResidentDetails.phoneNumber}
                      onChange={onChangeHandler}
                      placeholder="Phone No"
                    />
                  ) : (
                    resident.phoneNumber || "No Phone"
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  <div className="flex gap-2">
                    {editIndex === resident._id ? (
                      <>
                        <button
                          onClick={() => setEditIndex(null)}
                          className="cursor-pointer"
                          title="Cancel"
                        >
                          <CancelIcon />
                        </button>
                        <button
                          onClick={() => updateResident(resident._id)}
                          className="cursor-pointer text-green-600"
                          title="Save"
                        >
                          <UpdateIcon />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => clickHandler(resident._id)}
                          className="cursor-pointer text-red-600"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditIndex(resident._id);
                            setUpdatedResidentDetails({
                              email: resident.email || "",
                              phoneNumber: resident.phoneNumber || "",
                              name: resident.name || "",
                            });
                          }}
                          className="cursor-pointer"
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                      </>
                    )}
                  </div>
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
