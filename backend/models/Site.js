import mongoose from "mongoose";

const siteSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: String, required: true, ref: "User" },
});

const Site = mongoose.model("Site", siteSchema);

export default Site;
