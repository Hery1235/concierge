import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUser);
userRouter.post("/create", createUser);

export default userRouter;
