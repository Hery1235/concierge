import mongoose from "mongoose";

const parcelSchema = mongoose.Schema(
  {
    resident: { type: String, required: true, ref: "Resident" },
    site: { type: String, required: true, ref: "Site" },
    uniqueId: { type: String, required: true },
    pickedAt: { type: Date, default: null },
    pickedBy: { type: String, default: null },
    recivedBy: { type: String, required: true },
    handedOverBy: { type: String, default: null },
    pickUpCode: { type: String, default: null },
  },
  { timestamps: true }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
