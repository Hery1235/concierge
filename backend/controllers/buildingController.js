import Building from "../models/Building.js";
import Site from "../models/Site.js";
import User from "../models/User.js";

// Function to create building
export const createBuilding = async (req, res) => {
  try {
    const { name, totalNumberOfFlats, site } = req.body;

    const owner = req.user._id;
    const isAdmin = await User.findOne({ _id: owner, role: "admin" });
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Please ensure you are admin",
      });
    }

    const isSiteAvailible = await Site.findOne({ name: site });
    if (!isSiteAvailible) {
      return res.json({ success: false, message: "Site is Not Availible" });
    }

    await Building.create({
      name: name,
      totalFLats: totalNumberOfFlats,
      site: isSiteAvailible._id,
    });

    res.json({ success: true, message: "Building added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function to get all the buildings
export const getBuildingsForAdmin = async (req, res) => {
  try {
    const owner = req.user._id;
    const isAdmin = await User.findOne({ _id: owner, role: "admin" });
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Please ensure you are admin",
      });
    }

    const buildings = await Building.find({}).populate("site");
    res.json({ success: true, allBuildings: buildings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get building for concierge
export const getBuildingForConcierge = async (req, res) => {
  try {
    const user = req.user;
    const siteId = user.site;
    const buildings = await Building.find({ site: siteId });

    res.json({ success: true, buildings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
