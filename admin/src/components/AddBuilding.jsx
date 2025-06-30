import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "./Loader";

const AddBuilding = () => {
  const { sites, getSites } = useAppContext();

  const { user, axios, getToken, toast, loader, setLoader } = useAppContext();

  const [buildingDetails, setBuildingDetails] = useState({
    name: "",
    totalNumberOfFlats: 0,
    site: "",
  });
  // Create Site Function
  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      !buildingDetails.name?.trim() ||
      !buildingDetails.site?.trim() ||
      !buildingDetails.totalNumberOfFlats ||
      Number(buildingDetails.totalNumberOfFlats) <= 0
    ) {
      toast.error("Please fill all the fields correctly.");
      return;
    } else {
      try {
        setLoader(true);
        const { data } = await axios.post(
          "api/building/create",
          buildingDetails,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        if (data.success) {
          setBuildingDetails({
            name: "",
            totalNumberOfFlats: 0,
            site: "",
          });
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

  const onChangeHandler = (e) => {
    setBuildingDetails({ ...buildingDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getSites();
  }, []);

  {
    return loader ? (
      <Loader />
    ) : (
      <div className="flex flex-col max-w-xl gap-4">
        <h1 className="text-3xl">Add Building </h1>

        <form
          onSubmit={submitHandler}
          autoComplete="off"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full">
            <div className=""></div>

            <div className="w-full flex gap-2 flex-col">
              <label htmlFor="name">Building Name</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border  outline-none"
                placeholder="Enter Building Name"
                type="text"
                name="name"
                id="name"
                value={buildingDetails.name}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="address">Total Number Of Flats</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border  outline-none"
                type="number"
                min={1}
                max={200}
                name="totalNumberOfFlats"
                id="totalNumberOfFlats"
                value={buildingDetails.totalNumberOfFlats}
                onChange={onChangeHandler}
              />
            </div>

            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="site">Site Assigned</label>
              <select
                className="px-4 py-2 text-sm border-gray-300 border outline-none"
                name="site"
                id="site"
                value={buildingDetails.site}
                onChange={onChangeHandler}
              >
                <option value="">Select a Site</option>
                {sites.map((site) => (
                  <option
                    key={site.id || site._id || site.name}
                    value={site.name}
                  >
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex justify-end">
              <button className="mt-4 text-white bg-blue-500 px-6 py-2 rounded-sm justify-end hover:px-8 hover:py-3 transition-all duration-500 cursor-pointer hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AddBuilding;
