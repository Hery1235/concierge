import React, { useState, useContext, useEffect } from "react";
import "./KeyCard.css";
import { Context } from "../../Context/Context";
const KeyCard = (props) => {
  const [collectedBy, setCollectedBy] = useState({});

  const onChangeHandler = (e, id) => {
    console.log(collectedBy);
    setCollectedBy((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  const { allKeys, fetchAllKeys } = useContext(Context);

  useEffect(() => {
    fetchAllKeys();
  }, []);

  const keyCollected = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/update-key/${id}`, {
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
        throw new Error("Failed to update key");
      }

      const updatedKey = await response.json();
      console.log("Updated Key:", updatedKey);
      fetchAllKeys();
      // fetchTotalUndeliveredParceles();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="parcel-card-container">
      {allKeys
        .filter((key) => key.delivered === props.status)
        .map((key, index) => (
          <div className="parcel-card" key={key.id || index}>
            <h1 className="parcel-title">{key.address}</h1>
            <div className="details">
              <p className="bold parcel-label">Name</p>
              <p className="parcel-value">{key.name}</p>
            </div>

            <div className="details">
              <p className="bold parcel-label">Concierge</p>
              <p className="parcel-value">{key.conciargeName}</p>
            </div>

            <div className="details">
              <p className="bold parcel-label">Received</p>
              <p className="parcel-value">
                {new Date(key.date).toLocaleString()}
              </p>
            </div>

            {/* ✅ Show collectedBy and collectedOn if parcel is delivered */}
            {key.delivered && (
              <>
                <div className="details">
                  <p className="bold parcel-label">Collected By</p>
                  <p className="parcel-value">{key.collectedBy || "N/A"}</p>
                </div>
                <div className="details">
                  <p className="bold parcel-label">Collected On</p>
                  <p className="parcel-value">
                    {key.collectedOn
                      ? new Date(key.collectedOn).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </>
            )}

            {/* ✅ Hide input fields if parcel is already delivered */}
            {!key.delivered && (
              <div className="delivered-to">
                <p>Collected By: </p>
                <div className="input-for-delivered">
                  <input
                    name="name"
                    type="text"
                    value={collectedBy[key.id] || ""}
                    placeholder="Name"
                    className="input-name"
                    onChange={(e) => onChangeHandler(e, key.id)}
                  />
                  <button
                    onClick={() => keyCollected(key.id)}
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

export default KeyCard;
