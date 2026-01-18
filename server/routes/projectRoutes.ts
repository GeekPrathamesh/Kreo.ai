import express from "express"
import { protect } from "../middleware/auth.js";
import { createProject, createVideo, deleteProject, getPublishedprojects } from "../controllers/projectController.js";
import upload from "../configs/multer.js";
export const projectRouter = express.Router();

projectRouter.post("/create",upload.array("images",2),protect,createProject);
projectRouter.post("/video",protect,createVideo);
projectRouter.get("/published",protect,getPublishedprojects);
projectRouter.delete("/:projectId",protect,deleteProject);