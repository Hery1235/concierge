import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["concierge,admin"], default: "concierge" },
    _id: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
