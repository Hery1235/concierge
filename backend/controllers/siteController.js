import Building from "../models/Building.js";
import Site from "../models/Site.js";
import User from "../models/User.js";

export const createSite = async (req, res) => {
  try {
    const owner = req.user._id;
    const isAdmin = await User.findOne({ _id: owner, role: "admin" });
    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Please ensure you are admin",
      });
    }
    const { name, address } = req.body;

    // Check for dublication

    const isDublicate = await Site.findOne({ name, address });

    if (isDublicate) {
      return res.json({ success: false, message: "Site Duplicated" });
    }

    await Site.create({ name: name, address: address, owner: owner });
    res.json({ success: true, message: "Site Added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getSites = async (req, res) => {
  try {
    const userId = req.user._id;
    const sites = await Site.find({ owner: userId });
    res.json({ success: true, sites: sites });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delelte Site
export const delteSite = async (req, res) => {
  try {
    const isOwner = req.user.role;
    const { siteId } = req.body;
    console.log(siteId);

    if (isOwner !== "admin") {
      return res.json({
        success: false,
        message: "Please make sure you are admin",
      });
    }
    const isBuildingForSite = await Building.find({ site: siteId });
    if (isBuildingForSite.length > 0) {
      return res.json({
        success: false,
        message: "Data is attached to this Site",
      });
    }

    await Site.findByIdAndDelete(siteId);
    return res.json({
      success: true,
      message: "Site has beed deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
