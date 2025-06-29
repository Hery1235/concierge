import Building from "../models/Building.js";
import Resident from "../models/Resident.js";
import User from "../models/User.js";

// Create Resident

export const createResident = async (req, res) => {
  try {
    console.log("You are here ");
    const user = req.user;
    const name = req.body.residentPersonalDetails.fullname;
    const phoneNumber = req.body.residentPersonalDetails.phonenumber;
    const email = req.body.residentPersonalDetails.email;
    const flatNumber = req.body.flatNumber;
    const buildingAssigned = req.body.buildingAssigned;
    const siteId = req.user.site;

    // Getting building attached to the resident
    const building = await Building.findOne({ name: buildingAssigned });

    // cheching if the resident is already exist
    const isResidentAlreadyAvailible = await Resident.findOne({
      building: building._id,
      flatNumber,
    });
    if (
      isResidentAlreadyAvailible &&
      isResidentAlreadyAvailible.name === name
    ) {
      return res.json({
        success: false,
        message: "Resident Already Availible",
      });
    }

    // Create Resident

    await Resident.create({
      name,
      email,
      phoneNumber,
      building: building._id,
      flatNumber,
      site: siteId,
    });
    res.json({ success: true, message: "Resident Created Successfully " });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get all Resident for site
export const getAllResidents = async (req, res) => {
  try {
    const userId = req.user._id;
    const isOwner = req.user.role;
    // const isOwner = await User.findOne({ userId, role: "admin" });
    if (isOwner !== "admin") {
      return res.json({
        success: false,
        message: "Please make sure you are admin",
      });
    }
    const allResidents = await Resident.find({}).populate({
      path: "building",
      populate: {
        path: "site",
      },
    });

    res.json({ success: true, allResidents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Residents for site
export const getResidentsForSite = async (req, res) => {
  try {
    const isOwner = req.user.role;

    if (isOwner !== "concierge") {
      return res.json({
        success: false,
        message: "Please make sure you are Concierge",
      });
    }
    const residents = await Resident.find({
      site: req.user.site,
    }).populate("building");

    res.json({ success: true, residents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
