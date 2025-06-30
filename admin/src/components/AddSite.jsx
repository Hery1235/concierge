import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { data } from "react-router-dom";
import Loader from "./Loader";

const AddSite = () => {
  const { user, axios, getToken, toast, loader, setLoader } = useAppContext();

  const [siteDetail, setSiteDetails] = useState({
    name: "",
    address: "",
  });
  // Create Site Function
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!siteDetail.name?.trim() || !siteDetail.address?.trim()) {
      toast.error("Please Fill All The Fields");
    } else {
      try {
        setLoader(true);
        const { data } = await axios.post("/api/site/createsite", siteDetail, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        });

        if (data.success) {
          toast.success("Site Created Successfully ");
          setSiteDetails({
            name: "",
            address: "",
          });
          setLoader(false);
        } else {
          toast.error(data.message);
          setLoader(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoader(false);
      }
    }
  };

  const onChangeHandler = (e) => {
    setSiteDetails({ ...siteDetail, [e.target.name]: e.target.value });
  };

  {
    return loader ? (
      <Loader />
    ) : (
      <div className="flex flex-col max-w-xl gap-4">
        <h1 className="text-3xl">Add Site </h1>

        <form onSubmit={submitHandler} onClick={(e) => e.stopPropagation()}>
          <div className="w-full">
            <div className=""></div>
            <div className="w-full flex gap-2 flex-col">
              <label htmlFor="name">Site Name</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border  outline-none"
                placeholder="Enter Site Name..."
                type="text"
                name="name"
                id="name"
                value={siteDetail.name}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full flex gap-2 flex-col mt-4">
              <label htmlFor="address">Site Address</label>
              <input
                className="px-4 py-2 text-sm border-gray-300 border  outline-none"
                placeholder="Enter Site Address..."
                type="text"
                name="address"
                id="address"
                value={siteDetail.address}
                onChange={onChangeHandler}
              />
            </div>
            <div className="w-full flex justify-end">
              <button className="mt-4 text-white bg-blue-500 px-6 py-2 rounded-sm justify-end">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-w-xl gap-4">
      <h1 className="text-3xl">Add Site </h1>

      <form onSubmit={submitHandler} onClick={(e) => e.stopPropagation()}>
        <div className="w-full">
          <div className=""></div>
          <div className="w-full flex gap-2 flex-col">
            <label htmlFor="name">Site Name</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none"
              placeholder="Enter Site Name..."
              type="text"
              name="name"
              id="name"
              value={siteDetail.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="w-full flex gap-2 flex-col mt-4">
            <label htmlFor="address">Site Address</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none"
              placeholder="Enter Site Address..."
              type="text"
              name="address"
              id="address"
              value={siteDetail.address}
              onChange={onChangeHandler}
            />
          </div>
          <div className="w-full flex justify-end">
            <button className="mt-4 text-white bg-blue-500 px-6 py-2 rounded-sm justify-end">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSite;
