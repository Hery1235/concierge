import express from "express";
import {
  createSite,
  delteSite,
  getSites,
} from "../controllers/siteController.js";
import { protect } from "../middleware/authMiddleware.js";

const siteRouter = express.Router();

siteRouter.post("/createsite", protect, createSite);
siteRouter.get("/getsites", protect, getSites);
siteRouter.post("/delete", protect, delteSite);

export default siteRouter;
