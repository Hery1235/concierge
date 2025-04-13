import React, { useState,useContext } from "react";
import "./Addparcels.css";
import { Context } from "../../Context/Context";

const Addparcels = () => {
  const [parcelDetails, setparcelDetails] = useState({
    name: "",
    uniqueId: "",
    conciargeName: "",
    address: "",
  });
  const {addParcel} = useContext(Context);

  const changeHandler = (e) => {
    setparcelDetails({ ...parcelDetails, [e.target.name]: e.target.value });
  };

  const submitParcel = async (e) => {
  
      e.preventDefault();
       addParcel(parcelDetails);

   
  };

  return (
    <div className="add-parcels">
      <h2>Add Parcel</h2>
      <form onSubmit={submitParcel}>
        <div className="input-group">
          <label>Name on Parcel</label>
          <input
            value={parcelDetails.name}
            onChange={changeHandler}
            type="text"
            id=""
            name="name"
            placeholder="Enter Name on Parcel"
          />
        </div>

        <div className="input-group">
          <label>Unique ID</label>
          <input
            name="uniqueId"
            onChange={changeHandler}
            value={parcelDetails.uniqueId}
            id=""
            type="text"
            placeholder="Enter Parcel's Unique ID"
          />
        </div>

        <div className="input-group">
          <label>Concierge's Name</label>
          <input
            type="text"
            placeholder="Enter Concierge's Name"
            name="conciargeName"
            onChange={changeHandler}
            value={parcelDetails.conciargeName}
          />
        </div>

        <div className="input-group">
          <label>Flat Address</label>
          <input
            type="text"
            placeholder="Enter The Flat Address"
            onChange={changeHandler}
            value={parcelDetails.address}
            name="address"
          />
        </div>

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Addparcels;
