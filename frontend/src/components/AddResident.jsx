import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "./Loader";

const AddResident = () => {
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
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );

  const {
    user,
    axios,
    getToken,
    toast,
    buildings,
    getBuildings,
    loader,
    setLoader,
  } = useAppContext();

  // Resident data state
  const [residentPersonalDetails, setResidentPersonalDetails] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
  });
  const [buildingAssigned, setBuildingAssigned] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [showFlatInput, setShowFlatInput] = useState(false);

  // Find selected building
  const selectedBuilding = buildings.find((b) => b.name === buildingAssigned);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !residentPersonalDetails.fullname?.trim() ||
      !buildingAssigned?.trim() ||
      !flatNumber.trim()
    ) {
      toast.error("Please Fill Compulsary Fields ");
      return;
    } else {
      try {
        setLoader(true);
        const { data } = await axios.post(
          "api/resident/create",
          {
            residentPersonalDetails,
            buildingAssigned,
            flatNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );

        if (data.success) {
          setResidentPersonalDetails({
            fullname: "",
            email: "",
            phonenumber: "",
          });
          setBuildingAssigned("");
          setFlatNumber("");
          setLoader(false);
          toast.success(data.message);
        } else {
          setLoader(false);
          toast.error(data.message);
        }
      } catch (error) {
        setLoader(false);
        console.log(error.message);
      }
    }
  };

  const onChangeHandler = (e) => {
    setResidentPersonalDetails({
      ...residentPersonalDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getBuildings();
  }, []);

  {
    return loader ? (
      <Loader />
    ) : (
      <div className="flex flex-col max-w-xl gap-4">
        <h1 className="text-3xl">Add Resident</h1>

        <form
          onSubmit={submitHandler}
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full">
            <div className="w-full flex gap-2 flex-col">
              <label htmlFor="fullname">
                Full Name <span>*</span>
              </label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                placeholder="Enter Full Name"
                type="text"
                name="fullname"
                id="fullname"
                value={residentPersonalDetails.fullname}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="email">Email</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                placeholder="Enter Email"
                type="email"
                name="email"
                id="email"
                value={residentPersonalDetails.email}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-[40%] flex gap-2 flex-col mt-4">
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                placeholder="Enter Phone Number"
                type="tel"
                name="phonenumber"
                id="phonenumber"
                autoComplete="off"
                value={residentPersonalDetails.phonenumber}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="building">
                Building <span>*</span>
              </label>
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
                <label htmlFor="flat">
                  Flat Number <span>*</span>
                </label>
                <select
                  className="px-4 py-2 text-sm border-gray-300 border outline-none"
                  name="flat"
                  id="flat"
                  value={flatNumber}
                  onChange={(e) => setFlatNumber(e.target.value)}
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

export default AddResident;
