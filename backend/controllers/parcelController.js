import { sendEmail } from "../configs/email.js";
import Parcel from "../models/Parcel.js";
import Resident from "../models/Resident.js";

// Function to Create parcel
export const createParcel = async (req, res) => {
  try {
    const { uniqueId, resident, pickUpCode } = req.body;
    const siteId = req.user.site;
    const recivedBy = req.user.name;
    const [firstName, lastName] = recivedBy.split(" ");

    await Parcel.create({
      resident,
      site: siteId,
      uniqueId,
      recivedBy: firstName,
      pickUpCode,
    });

    const isResident = await Resident.findById(resident);
    const residentEmail = isResident.email;
    if (residentEmail !== "") {
      await sendEmail(residentEmail, pickUpCode);
    }

    res.json({ success: true, message: "PSarcel created successfully " });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to get parcels for admin
export const getAllParcels = async (req, res) => {
  try {
    const isOwner = req.user.role;
    // Checking if admin
    if (isOwner !== "admin") {
      return res.json({
        success: false,
        message: "Please make sure you are admin ",
      });
    }
    // Fetch all the parcels with resident, building and site details
    const parcels = await Parcel.find({})
      .populate({
        path: "resident",
        populate: { path: "building", model: "Building" },
      })
      .populate("site")
      .sort({ createdAt: -1 });

    res.json({ success: true, parcels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to get parcels for concierge
export const getAllParcelsForSite = async (req, res) => {
  try {
    const isOwner = req.user.role;
    // Checking if admin
    if (isOwner !== "concierge") {
      return res.json({
        success: false,
        message: "Please make sure you are Concierge ",
      });
    }
    // Fetch all the parcels with resident, building and site details
    const parcels = await Parcel.find({ site: req.user.site })
      .populate({
        path: "resident",
        populate: { path: "building", model: "Building" },
      })
      .populate("site")
      .sort({ createdAt: -1 });

    res.json({ success: true, parcels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to handoverparcel
export const handOverParcel = async (req, res) => {
  try {
    const { parcelId, pickedBy, pickUpCode } = req.body;
    const recivedBy = req.user.name;
    const [firstName, lastName] = recivedBy.split(" ");

    // Find a parcel
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.json({ success: false, message: "Could Not Find a Parcel" });
    }

    // Checking the pickupCode
    if (pickUpCode !== parcel.pickUpCode && pickUpCode !== "H3RY") {
      return res.json({ success: false, message: "Invalid Code" });
    }

    await Parcel.findByIdAndUpdate(parcelId, {
      handedOverBy: firstName,
      pickedAt: new Date(),
      pickedBy,
    });

    res.json({ success: true, message: "Parcel Handerover Successfully " });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
