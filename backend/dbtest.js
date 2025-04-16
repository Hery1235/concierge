const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mh47098:Hamdankhan1122%40cluster0.owbqb.mongodb.net/concierge?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
