import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    res.json({ success: true, user: req.user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
