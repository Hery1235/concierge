import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBuilding,
  getBuildingsForAdmin,
} from "../controllers/buildingController.js";

const buildingRouter = express.Router();

buildingRouter.post("/create", protect, createBuilding);
buildingRouter.get("/getallbuildingsforadmin", protect, getBuildingsForAdmin);

export default buildingRouter;
