import mongoose from "mongoose";

const buildingSchema = mongoose.Schema({
  name: { type: String, required: true },
  totalFLats: { type: String, required: true },
  site: { type: String, required: true, ref: "Site" },
});

const Building = mongoose.model("Building", buildingSchema);

export default Building;
