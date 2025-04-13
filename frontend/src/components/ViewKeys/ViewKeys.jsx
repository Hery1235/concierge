import React, { useContext, useEffect, useState } from "react";
import "./ViewKeys.css";
import ParcelCard from "../../components/ParcelCard/ParcelCard";
import search_icon from "../../assets/search.png";
import { Context } from "../../Context/Context";
import KeyCard from "../KeyCard/KeyCard";
const ViewKeys = (props) => {
  const [searchText, setSearchText] = useState("");
  const { allKeys, fetchAllKeys, filterParcelsByFlatNumber } =
    useContext(Context);

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchAllKeys();
    // fetchTotalUndeliveredParceles();
  }, []);
  return (
    <div className="view-parcels">
      <div className="search-container">
        <div className="searchbar">
          <input
            name="searchText"
            value={searchText}
            onChange={onChangeHandler}
            type="text"
            placeholder="Search By Name Or Flat Address"
          />
          <img
            onClick={() => filterParcelsByFlatNumber(searchText)}
            src={search_icon}
            alt="Search Icon"
            style={{ cursor: "pointer" }}
          />
        </div>
        {!props.status ? <p>Total UnDelivered parcels: 100</p> : null}
      </div>

      <div className="all-parcels">
        <KeyCard parcels={allKeys} status={props.status} />
      </div>
    </div>
  );
};

export default ViewKeys;
