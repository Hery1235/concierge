import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createParcel,
  deleteParcel,
  getAllParcels,
  getAllParcelsForSite,
  handOverParcel,
} from "../controllers/parcelController.js";

const parcelRouter = express.Router();

parcelRouter.post("/create", protect, createParcel);
parcelRouter.get("/allparcels", protect, getAllParcels);
parcelRouter.get("/allparcelsforsite", protect, getAllParcelsForSite);
parcelRouter.post("/handoverparcel", protect, handOverParcel);
parcelRouter.post("/delete", protect, deleteParcel);

// residentRouter.get("/getsites", protect, getSites);

export default parcelRouter;
