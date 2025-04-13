import { React, useState } from "react";
import "./AddBuilding.css";
const AddBuilding = () => {
  const [buildingName, setBuildingName] = useState("");

  const submitParcel = async (event) => {
    event.preventDefault();

    try {
      const responce = await fetch("http://localhost:5000/addbuilding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buildingName }),
      });

      if (!responce.ok) {
        throw new Error("Failed to add building");
      }

      const result = await responce.json();
      console.log("Building added successfully ");
    } catch (error) {
      console.log("Error while Adding Data", error);
    }
  };

  const onChangeHandler = (event) => {
    setBuildingName(event.target.value);
  };
  return (
    <div className="add-parcels">
      <h2>Add Building</h2>
      <form onSubmit={submitParcel}>
        <div className="input-group">
          <label>Building Name</label>
          <input
            // value={parcelDetails.name}
            // onChange={changeHandler}
            type="text"
            id=""
            name="buildingName"
            value={buildingName}
            placeholder="Input Here"
            onChange={onChangeHandler}
          />
        </div>
        <div className="input-group">
          <label>Total Number Of Flats</label>
          <input
            // value={parcelDetails.name}
            // onChange={changeHandler}
            type="text"
            id=""
            name="name"
            placeholder="Input Here"
          />
        </div>

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddBuilding;
