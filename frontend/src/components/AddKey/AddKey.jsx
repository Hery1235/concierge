import {React,useState,useContext} from 'react'
import './AddKey.css'
import { Context } from "../../Context/Context";

const AddKey = () => {
  const [keyDetail, setKeyDetail] = useState({
    name: "",
    conciargeName: "",
    address: "",
  });
  const {addKey} = useContext(Context);

  const changeHandler = (e) => {
    setKeyDetail({ ...keyDetail, [e.target.name]: e.target.value });
   
  };

  const submitKey = async (e) => {
  
      e.preventDefault();
      addKey(keyDetail);

   
  };

  return (
    <div className="add-parcels">
      <h2>Key Depositer</h2>
      <form onSubmit={submitKey}>
        <div className="input-group">
          <label>Name of Person</label>
          <input
            value={keyDetail.name}
            onChange={changeHandler}
            type="text"
            id=""
            name="name"
            placeholder="Enter Name"
          />
        </div>

     

        <div className="input-group">
          <label>Concierge's Name</label>
          <input
            type="text"
            placeholder="Enter Concierge's Name"
            name="conciargeName"
            onChange={changeHandler}
            value={keyDetail.conciargeName}
          />
        </div>

        <div className="input-group">
          <label>Flat Address</label>
          <input
            type="text"
            placeholder="Enter The Flat Address"
            onChange={changeHandler}
            value={keyDetail.address}
            name="address"
          />
        </div>

        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddKey
