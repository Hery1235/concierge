import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "./Loader";

const AddParcel = () => {
  const {
    axios,
    getToken,
    toast,
    buildings,
    getBuildings,
    residents,
    getResidents,
    loader,
    setLoader,
  } = useAppContext();

  const [buildingAssigned, setBuildingAssigned] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [showFlatInput, setShowFlatInput] = useState(false);
  const [showResidentInput, setShowResidentInput] = useState(false);
  const [residentAssignedId, setResidentAssignedId] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  // Find selected building
  const selectedBuilding = buildings.find((b) => b.name === buildingAssigned);
  const selectedFlatResidents = residents.filter(
    (res) =>
      res.building.name.toString() === buildingAssigned.toString() &&
      res.flatNumber === Number(flatNumber)
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !uniqueId?.trim() ||
      !buildingAssigned.trim() ||
      !flatNumber.trim() ||
      !residentAssignedId.trim()
    ) {
      toast.error("Please Fill All Fields");
    } else {
      try {
        setLoader(false);
        const generateCode = () => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          let code = "";
          for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return code;
        };

        const pickUpCode = generateCode();

        const { data } = await axios.post(
          "/api/parcel/create",
          { uniqueId, resident: residentAssignedId, pickUpCode },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        if (data.success) {
          setBuildingAssigned("");
          setFlatNumber("");
          setResidentAssignedId("");
          setUniqueId("");
          setLoader(false);
          toast.success(data.message);
        } else {
          setLoader(false);
          toast.error(data.message);
        }
      } catch (error) {
        setLoader(false);
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    getResidents();
    getBuildings();
  }, []);
  {
    return loader ? (
      <Loader />
    ) : (
      <div className="flex flex-col max-w-xl gap-4">
        <h1 className="text-3xl">Add New Parcel </h1>

        <form
          onSubmit={submitHandler}
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full">
            <div className="w-full flex gap-2 flex-col">
              <label htmlFor="uniqueNumber">Unique Number</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                placeholder="Enter Full Name"
                type="text"
                name="uniqueNumber"
                id="uniqueNumber"
                value={uniqueId}
                onChange={(e) => {
                  setUniqueId(e.target.value);
                }}
              />
            </div>

            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="building">Building</label>
              <select
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                name="building"
                id="building"
                value={buildingAssigned}
                onChange={(e) => {
                  setBuildingAssigned(e.target.value);
                  setShowFlatInput(e.target.value !== "");
                }}
              >
                <option value="">Select Building</option>
                {buildings.map((building) => (
                  <option
                    key={building.id || building._id || building.name}
                    value={building.name}
                  >
                    {building.name}
                  </option>
                ))}
              </select>
            </div>

            {showFlatInput && selectedBuilding && (
              <div className="w-full flex gap-2 flex-col mt-4">
                <label htmlFor="flat">Flat Number</label>
                <select
                  className="px-4 py-2 text-sm border-gray-300 border outline-none"
                  name="flat"
                  id="flat"
                  value={flatNumber}
                  onChange={(e) => {
                    setShowFlatInput(e.target.value !== "");
                    setFlatNumber(e.target.value);
                  }}
                >
                  <option value="">Select Flat</option>
                  {Array.from(
                    { length: selectedBuilding.totalFLats },
                    (_, i) => i + 1
                  ).map((flat) => (
                    <option key={flat} value={flat}>
                      Flat {flat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showFlatInput && selectedBuilding && flatNumber && (
              <div className="w-full flex gap-2 flex-col mt-4">
                <label htmlFor="resident">Resident Name</label>
                <select
                  className="px-4 py-2 text-sm border-gray-300 border outline-none"
                  name="resident"
                  id="resident"
                  value={residentAssignedId}
                  onChange={(e) => {
                    // setResidentAssigned(e.target.value !== "");
                    setResidentAssignedId(e.target.value);
                  }}
                >
                  <option value="">Select Resident</option>
                  {selectedFlatResidents.map((resi) => (
                    <option
                      key={resi.id || resi._id || resi.name}
                      value={resi._id}
                    >
                      {resi.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="w-full flex justify-end">
              <button className="mt-4 text-white bg-blue-500 px-6 py-2 rounded-sm hover:px-8 hover:py-3 transition-all duration-500 cursor-pointer hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AddParcel;
