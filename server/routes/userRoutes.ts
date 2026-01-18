import express from "express"
import { getToggleprojects, getUsercredits, getUserprojectbyID, getUserprojects } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
export const userRouter = express.Router();

userRouter.get("/credits",protect,getUsercredits);
userRouter.get("/projects",protect,getUserprojects);
userRouter.get("/project/:projectId",protect,getUserprojectbyID);
userRouter.post("/publish/:id",protect,getToggleprojects);

