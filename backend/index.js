const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Parcel = require("./models/parcel");
const Key = require("./models/key");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://mh47098:Hamdankhan1122%40@cluster0.owbqb.mongodb.net/Conciargeee"
);

app.get("/", (req, res) => {
  res.send("App is running on the port");
});

app.post("/addbuilding", async (req, res) => {
  const data = req.body.buildingName;
  console.log(data);
});

app.post("/addparcel", async (req, res) => {
  let parcels = await Parcel.find({});
  let id;
  if (parcels.length > 0) {
    const lastParcelItemArray = parcels.slice(-1);
    let lastParcel = lastParcelItemArray[0];
    id = lastParcel.id + 1;
  } else {
    id = 1;
  }

  const parcel = new Parcel({
    id: id,
    name: req.body.name,
    uniqueId: req.body.uniqueId,
    conciargeName: req.body.conciargeName,
    address: req.body.address,
    collectedBy: "",
  });

  await parcel.save();
  console.log("Product saved ");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allparcels", async (req, res) => {
  let allparcels = await Parcel.find({});
  try {
    res.send(allparcels);
  } catch (error) {
    console.log("Error in sending parcels data ");
  }
});

app.get("/totalundeliveredparcels", async (req, res) => {
  try {
    // Find all undelivered parcels (assuming 'delivered' field exists)
    const allparcels = await Parcel.find({ delivered: false });
    const totalundeliveredparcels = allparcels.length;

    // Send the count of undelivered parcels with a valid status code (200)
    res.status(200).json(totalundeliveredparcels); // Correct way to send status code with JSON
  } catch (error) {
    console.log("Error in sending total count:", error);
    // Send 500 status code for server error
    res
      .status(500)
      .send("Error occurred while fetching total undelivered parcels.");
  }
});

// Update collectedBy and delivered status
app.put("/update-parcel/:id", async (req, res) => {
  const { collectedBy } = req.body; // Get collectedBy from request body
  const parcelId = req.params.id; // Get parcel ID from URL params
  console.log("Aoi callied");
  try {
    const updatedParcel = await Parcel.findOneAndUpdate(
      { id: parcelId }, // Find parcel by uniqueId
      {
        collectedBy: collectedBy, // Update collectedBy
        delivered: true, // Mark as delivered
        collectedOn: new Date(), // Save current date
      },
      { new: true } // Return the updated document
    );

    if (!updatedParcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json(updatedParcel);
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// app.get("/getParcelByFlatNumber", async (req, res) => {
//   try {
//     const { flatNumber } = req.body; // ✅ Extract flatNumber from request body

//     if (!flatNumber) {
//       return res.status(400).json({ error: "Flat number is required" });
//     }

//     const parcels = await Parcel.find({ address: flatNumber }); // ✅ Await the query

//     if (parcels.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No parcels found for this flat number" });
//     }

//     res.status(200).json(parcels); // ✅ Send response
//   } catch (error) {
//     console.error("Error fetching parcels:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.post("/addKey", async (req, res) => {
  let keys = await Key.find({});
  let id;
  if (keys.length > 0) {
    const lastKeyItemArray = keys.slice(-1);
    let lastKey = lastKeyItemArray[0];
    id = lastKey.id + 1;
  } else {
    id = 1;
  }

  const key = new Key({
    id: id,
    name: req.body.name,
    conciargeName: req.body.conciargeName,
    address: req.body.address,
    collectedBy: "",
  });

  await key.save();
  console.log("Product saved ");
  res.json({
    success: true,
    name: req.body.name,
  });
});
app.get("/allkeys", async (req, res) => {
  let allkeys = await Key.find({});
  try {
    res.send(allkeys);
  } catch (error) {
    console.log("Error in sending Keys data ");
  }
});
app.put("/update-key/:id", async (req, res) => {
  const { collectedBy } = req.body; // Get collectedBy from request body
  const keyId = req.params.id; // Get parcel ID from URL params
  console.log("key update api callied", keyId);
  try {
    const updatedKey = await Key.findOneAndUpdate(
      { id: keyId }, // Find parcel by uniqueId
      {
        collectedBy: collectedBy, // Update collectedBy
        delivered: true, // Mark as delivered
        collectedOn: new Date(), // Save current date
      },
      { new: true } // Return the updated document
    );

    if (!updatedKey) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json(updatedKey);
  } catch (error) {
    console.error("Error updating Key:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on 5000");
  } else {
    console.log("Error ", error);
  }
});
