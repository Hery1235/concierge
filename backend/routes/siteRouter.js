import express from "express";
import { createSite, getSites } from "../controllers/siteController.js";
import { protect } from "../middleware/authMiddleware.js";

const siteRouter = express.Router();

siteRouter.post("/createsite", protect, createSite);
siteRouter.get("/getsites", protect, getSites);

export default siteRouter;
