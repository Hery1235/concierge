import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const AddEmploye = () => {
  const { sites, getSites } = useAppContext();

  const { user, axios, getToken, toast } = useAppContext();

  const [conciergeDetail, setConciergeDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    site: "",
  });
  // Create Site Function
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("api/user/create", conciergeDetail, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    setConciergeDetail({ ...conciergeDetail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getSites();
  }, []);
  return (
    <div className="flex flex-col max-w-xl gap-4">
      <h1 className="text-3xl">Add Concierge </h1>

      <form
        onSubmit={submitHandler}
        autoComplete="off"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <div className=""></div>

          <div className="w-full flex gap-2 flex-col">
            <label htmlFor="name">First Name</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none"
              placeholder="Enter First Name"
              type="text"
              name="firstname"
              id="firstname"
              value={conciergeDetail.firstname}
              onChange={onChangeHandler}
            />
          </div>

          <div className="w-full flex gap-2 flex-col mt-4">
            <label htmlFor="address">Last Name</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none"
              placeholder="Enter Last Name"
              type="text"
              name="lastname"
              id="lastname"
              value={conciergeDetail.lastname}
              onChange={onChangeHandler}
            />
          </div>

          <div className="w-full flex gap-2 flex-col mt-4">
            <label htmlFor="name">Email</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none"
              placeholder="Enter Email"
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              value={conciergeDetail.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className="w-full flex gap-2 flex-col mt-4">
            <label htmlFor="address">Passoword</label>
            <input
              className="px-4 py-2 text-sm border-gray-300 border  outline-none "
              placeholder="Enter Your Password"
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              value={conciergeDetail.password}
              onChange={onChangeHandler}
            />
          </div>

          <div className="w-full flex gap-2 flex-col mt-4">
            <label htmlFor="site">Site Assigned</label>
            <select
              className="px-4 py-2 text-sm border-gray-300 border outline-none"
              name="site"
              id="site"
              value={conciergeDetail.site}
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
};

export default AddEmploye;
