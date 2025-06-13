import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./configs/db.js";
import clerkWebHooks from "./controllers/clerkWebhooks.js";
import { clerkMiddleware } from "@clerk/express";
import siteRouter from "./routes/siteRouter.js";
import userRouter from "./routes/userRouter.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
connectDb();

app.use(express.json());
app.use(clerkMiddleware());
// Clerk webhooks
app.use("/api/clerk", express.raw({ type: "application/json" }));
app.use("/api/clerk", clerkWebHooks);

// Site Api
app.use("/api/site", siteRouter);

// User api
app.use("/api/user", userRouter);

// Server Running
app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.listen(port, () => {
  console.log("Server is started successfully on port ", port);
});
