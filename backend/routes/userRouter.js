import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUser);
userRouter.post("/create", protect, createUser);
userRouter.get("/allusers", protect, getAllUsers);

export default userRouter;
