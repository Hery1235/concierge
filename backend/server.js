import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/db.js";
import clerkWebHooks from "./controllers/clerkWebhooks.js";
import { clerkMiddleware } from "@clerk/express";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
connectDb();

app.use(express.json());
app.use(clerkMiddleware());
// Clerk webhooks
app.use("/api/clerk", clerkWebHooks);

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log("Server is started successfully");
});
