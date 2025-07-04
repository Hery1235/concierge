import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  createResident,
  deleteResident,
  getAllResidents,
  getResidentsForSite,
  updateResident,
} from "../controllers/residentController.js";

const residentRouter = express.Router();

residentRouter.post("/create", protect, createResident);
residentRouter.get("/allresidents", protect, getAllResidents);
residentRouter.get("/getResidentsForSite", protect, getResidentsForSite);
residentRouter.post("/delete", protect, deleteResident);
residentRouter.post("/update", protect, updateResident);

// residentRouter.get("/getsites", protect, getSites);

export default residentRouter;
