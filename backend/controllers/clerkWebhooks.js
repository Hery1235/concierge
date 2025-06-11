import { Webhook } from "svix";
import User from "../models/User";

const clerkWebHooks = async () => {
  try {
    // creating webhook instance
    const webhookInstance = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting headers from the request
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verifying headers and req using webhookinstance

    await webhookInstance.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imaage: data.image_url,
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imaage: data.image_url,
        };
        await User.findByIdAndUpdate(userData);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }

    res.json({ success: true, message: "Webhook recived" });
  } catch (error) {
    console;
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
