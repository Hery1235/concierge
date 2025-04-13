import React, { useState, useContext, useEffect } from "react";
import "./ParcelCard.css";
import { Context } from "../../Context/Context";

const ParcelCard = (props) => {

  const [collectedBy, setCollectedBy] = useState({});

  const onChangeHandler = (e, id) => {
    setCollectedBy((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  const { allParcels, fetchAllParcels,  fetchTotalUndeliveredParceles, } = useContext(Context);

  useEffect(() => {
    fetchAllParcels();
   
  }, []);

  const parcelCollected = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/update-parcel/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectedBy: collectedBy[id],
          collectedOn: new Date().toISOString(), // Store the current date
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update parcel");
      }

      const updatedParcel = await response.json();
      console.log("Updated Parcel:", updatedParcel);
      fetchAllParcels();
      fetchTotalUndeliveredParceles();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="parcel-card-container">
      {allParcels
        .filter((parcel) => parcel.delivered === props.status)
        .map((parcel, index) => (
          <div className="parcel-card" key={parcel.id || index}>
            <h1 className="parcel-title">{parcel.address}</h1>
            <div className="details">
              <p className="bold parcel-label">Name</p>
              <p className="parcel-value">{parcel.name}</p>
            </div>
            <div className="details">
              <p className="bold parcel-label">Parcel Id</p>
              <p className="parcel-value">{parcel.uniqueId}</p>
            </div>
            <div className="details">
              <p className="bold parcel-label">Concierge</p>
              <p className="parcel-value">{parcel.conciargeName}</p>
            </div>

            <div className="details">
              <p className="bold parcel-label">Received</p>
              <p className="parcel-value">{new Date(parcel.date).toLocaleString()}</p>
            </div>

            {/* ✅ Show collectedBy and collectedOn if parcel is delivered */}
            {parcel.delivered && (
              <>
                <div className="details">
                  <p className="bold parcel-label">Collected By</p>
                  <p className="parcel-value">{parcel.collectedBy || "N/A"}</p>
                </div>
                <div className="details">
                  <p className="bold parcel-label">Collected On</p>
                  <p className="parcel-value">
                    {parcel.collectedOn ? new Date(parcel.collectedOn).toLocaleString() : "N/A"}
                  </p>
                </div>
              </>
            )}

            {/* ✅ Hide input fields if parcel is already delivered */}
            {!parcel.delivered && (
              <div className="delivered-to">
                <p>Collected By: </p>
                <div className="input-for-delivered">
                  <input
                    name="name"
                    type="text"
                    value={collectedBy[parcel.id] || ""}
                    placeholder="Name"
                    className="input-name"
                    onChange={(e) => onChangeHandler(e, parcel.id)}
                  />
                  <button
                    onClick={() => parcelCollected(parcel.id)}
                    className="submit-button"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ParcelCard;
