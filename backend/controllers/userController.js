import Site from "../models/Site.js";
import User from "../models/User.js";

// Create a User
export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, site } = req.body;
    const isSiteAvailible = await Site.findOne({ name: site });
    if (!isSiteAvailible) {
      return res.json({ success: false, message: "Site is not Availible" });
    }

    const siteId = isSiteAvailible._id;

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
