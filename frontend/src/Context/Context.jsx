import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ContextProvider = (props) => {
  // Store the complete list and the filtered list separately
  const [allParcels, setAllParcels] = useState([]);
  const [originalParcels, setOriginalParcels] = useState([]);
  const [allKeys, setAllKeys] = useState([]);
  const [originalKeys, setOriginalKeys] = useState([]);
  const [totalundeliveredparcels, setTotalUndeliveredParcels] = useState();

  useEffect(() => {
    fetchTotalUndeliveredParceles();
  }, []);

  const addParcel = async (parcel) => {
    try {
      let responce;
      let parcelToAdd = parcel;
      console.log(parcel);
      responce = await fetch("http://localhost:5000/addparcel", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(parcelToAdd),
      });
      if (!responce.ok) {
        throw new Error(`Add product failed with status: ${responce.status}`);
      }
      const addParcelData = await responce.json();
      console.log("Add parcel responce:", addParcelData);

      if (addParcelData.success) {
        alert("Parcel submitted successfully ");
      }
    } catch (error) {
      console.log("Error while uploading parcel ", error);
    }
  };
  const fetchTotalUndeliveredParceles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/totalundeliveredparcels",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Total undelivered parcels:", data);
        setTotalUndeliveredParcels(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllParcels = async () => {
    try {
      const response = await fetch("http://localhost:5000/allparcels", {
        method: "GET",
      });
      const data = await response.json();
      setAllParcels(data);
      setOriginalParcels(data); // Save the original data as well
    } catch (error) {
      console.error("Error in fetching parcels:", error);
    }
  };

  const filterParcelsByFlatNumber = (searchText) => {
    if (!searchText.trim()) {
      // If search is empty, reset to original list
      setAllParcels(originalParcels);
      setAllKeys(originalKeys);
      return;
    }
    // Convert search text to lowercase to make search case-insensitive
    const lowerSearch = searchText.toLowerCase();

    // Filter by checking if either the address or name includes the search text
    const filteredParcels = originalParcels.filter((parcel) => {
      const address = parcel.address ? parcel.address.toLowerCase() : "";
      const name = parcel.name ? parcel.name.toLowerCase() : "";

      return address.includes(lowerSearch) || name.includes(lowerSearch);
    });
    const filteredKeys = originalKeys.filter((key) => {
      const address = key.address ? key.address.toLowerCase() : "";
      const name = key.name ? key.name.toLowerCase() : "";
      return address.includes(lowerSearch) || name.includes(lowerSearch);
    });
    setAllParcels(filteredParcels);
    setAllKeys(filteredKeys);
  };

  const addKey = async (key) => {
    try {
      let responce;
      let keyToAdd = key;
      console.log(keyToAdd);
      responce = await fetch("http://localhost:5000/addkey", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(keyToAdd),
      });
      if (!responce.ok) {
        throw new Error(`Add product failed with status: ${responce.status}`);
      }
      const addKeyData = await responce.json();
      console.log("Add parcel responce:", addKeyData);

      if (addKeyData.success) {
        alert("Key submitted successfully ");
      }
    } catch (error) {
      console.log("Error while uploading Key ", error);
    }
  };
  const fetchAllKeys = async () => {
    try {
      const response = await fetch("http://localhost:5000/allkeys", {
        method: "GET",
      });
      const data = await response.json();
      setAllKeys(data);
      setOriginalKeys(data); // Save the original data as well
    } catch (error) {
      console.error("Error in fetching Keys:", error);
    }
  };

  const contextValue = {
    allParcels,
    addParcel,
    fetchAllParcels,
    totalundeliveredparcels,
    fetchTotalUndeliveredParceles,
    setAllParcels,
    filterParcelsByFlatNumber,
    setOriginalParcels,
    allKeys,
    addKey,
    fetchAllKeys,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
