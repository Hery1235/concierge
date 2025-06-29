import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createResident,
  getAllResidents,
  getResidentsForSite,
} from "../controllers/residentController.js";

const residentRouter = express.Router();

residentRouter.post("/create", protect, createResident);
residentRouter.get("/allresidents", protect, getAllResidents);
residentRouter.get("/getResidentsForSite", protect, getResidentsForSite);
// residentRouter.get("/getsites", protect, getSites);

export default residentRouter;
