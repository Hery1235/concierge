import mongoose from "mongoose";

const residentSchema = mongoose.Schema({
  name: { type: String, required: true },
  flatNumber: { type: Number },
  email: { type: String },
  phoneNumber: { type: String },
  building: { type: String, required: true, ref: "Building" },
  site: { type: String, required: true, ref: "Site" },
});

const Resident = mongoose.model("Resident", residentSchema);

export default Resident;
