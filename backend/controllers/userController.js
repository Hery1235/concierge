import Site from "../models/Site.js";
import User from "../models/User.js";
import { clerkClient, users } from "@clerk/clerk-sdk-node";

// Create a User
export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, site } = req.body;

    const userId = req.user._id;
    // Check user if admin

    const isAdmin = await User.findOne({ _id: userId, role: "admin" });

    if (!isAdmin) {
      return res.json({
        success: false,
        message: "You Make Sure Your Are Admin",
      });
    }
    const isSiteAvailible = await Site.findOne({ name: site });
    if (!isSiteAvailible) {
      return res.json({ success: false, message: "Site is not Availible" });
    }

    const siteId = isSiteAvailible._id;

    const dublicateUser = await User.findOne({ email });
    if (dublicateUser) {
      return res.json({ success: false, message: "Email Already Registered " });
    }

    // 2. Create user in Clerk and attach `siteId` as metadata

    const clerkUser = await clerkClient.users.createUser({
      firstName: firstname,
      lastName: lastname,
      emailAddress: [email],
      password,
      publicMetadata: {
        site: siteId, // Send as ObjectId, not string
      },
    });

    res.json({
      success: true,
      message: "User created successfully",
      userId: clerkUser.id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get a logged in user detail
export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    res.json({ success: true, user: req.user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    // Check user if admin

    const isAdmin = await User.findOne({ _id: userId, role: "admin" });

    if (!isAdmin) {
      return res.json({
        success: false,
        message: "You Make Sure You are loggin in to the right portal",
      });
    }
    const allUsers = await User.find({})
      .populate("site")
      .sort({ createdAt: -1 });

    res.json({ success: true, users: allUsers });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
