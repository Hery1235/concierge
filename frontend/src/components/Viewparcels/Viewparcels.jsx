import React, { useContext, useEffect, useState } from "react";
import "./Viewparcels.css";
import ParcelCard from "../../components/ParcelCard/ParcelCard";
import search_icon from "../../assets/search.png";
import { Context } from "../../Context/Context";

const Viewparcels = (props) => {
  const [searchText, setSearchText] = useState("");
  const {
    allParcels,
    fetchAllParcels,
    totalundeliveredparcels,
    fetchTotalUndeliveredParceles,
    filterParcelsByFlatNumber,
  
  } = useContext(Context);

 
  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };



  useEffect(() => {
    fetchAllParcels();
    fetchTotalUndeliveredParceles();
    
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
        {!props.status ? (
          <p>Total UnDelivered parcels: {totalundeliveredparcels}</p>
        ) : null}
      </div>

      <div className="all-parcels">
        <ParcelCard parcels={allParcels} status={props.status} />
      </div>
    </div>
  );
};

export default Viewparcels;
