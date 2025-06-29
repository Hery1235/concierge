import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBuilding,
  getBuildingForConcierge,
  getBuildingsForAdmin,
} from "../controllers/buildingController.js";

const buildingRouter = express.Router();

buildingRouter.post("/create", protect, createBuilding);
buildingRouter.get("/getallbuildingsforadmin", protect, getBuildingsForAdmin);
buildingRouter.get(
  "/getbuildingforconcierge",
  protect,
  getBuildingForConcierge
);
export default buildingRouter;
