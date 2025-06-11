import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/db.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
connectDb();

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log("Server is started successfully");
});
