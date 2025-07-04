import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CollectionDetails = () => {
  const {
    setShowCollectionDetailPage,
    parcelId,
    axios,
    getToken,
    getParcels,
    showCodeInput,
  } = useAppContext();
  const [pickingUpDetails, setPickingUpDetails] = useState({
    pickedBy: "",
    pickUpCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickingUpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!pickingUpDetails.pickedBy?.trim()) {
      toast.error("Please Fill All The Fields");
    } else {
      try {
        const { data } = await axios.post(
          "/api/parcel/handoverparcel",
          {
            pickedBy: pickingUpDetails.pickedBy,
            pickUpCode: pickingUpDetails.pickUpCode,
            parcelId,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        if (data.success) {
          toast.success(data.message);
          getParcels();
          setShowCollectionDetailPage(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <form
        onSubmit={submitHandler}
        className="flex bg-white rounded-xl max-md:mx-2 p-6"
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Pick Up Details</h1>

            <button
              type="button"
              onClick={() => setShowCollectionDetailPage(false)}
              aria-label="Close"
              className="text-lg cursor-pointer"
            >
              X
            </button>
          </div>

          <div className="w-full flex gap-2 flex-col mt-4">
            <label className="text-sm" htmlFor="pickedBy">
              Name
            </label>
            <input
              className="px-4 py-2 text-sm border border-gray-300 outline-none rounded"
              placeholder="Enter Full Name"
              type="text"
              name="pickedBy"
              id="pickedBy"
              value={pickingUpDetails.pickedBy}
              onChange={handleChange}
            />
          </div>

          {showCodeInput && (
            <div className="w-full flex gap-2 flex-col mt-4">
              <label className="text-sm" htmlFor="pickUpCode">
                Pick Up Code
              </label>
              <input
                className="px-4 py-2 text-sm border border-gray-300 outline-none rounded"
                placeholder="Enter Pick Up Code"
                type="text"
                name="pickUpCode"
                id="pickUpCode"
                value={pickingUpDetails.pickUpCode}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="mt-4 text-white bg-blue-500 px-6 py-2 rounded-sm hover:px-8 hover:py-3 transition-all duration-500 cursor-pointer hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionDetails;
