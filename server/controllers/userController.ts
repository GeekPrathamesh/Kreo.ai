import { Request, Response } from "express";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";


//get user credits
export const getUsercredits=async(req:Request,res:Response)=>{
    try {
         const {userId}=req.auth();
        if(!userId) return res.status(401).json({message:"unauthorized"});
        let user = await User.findOne({ id: userId });
        
        
        // Fallback: If user is not found, return unauthorized
        if (!user) {
            return res.status(401).json({message: "User not found"});
        }
        
        res.json({credits: user?.credits || 0});
    } catch (error:any) {
       res.status(500).json({message:error.message}) 
    }
}

//get user all projects
export const getUserprojects=async(req:Request,res:Response)=>{
    try {
        const {userId}=req.auth();
        if(!userId) return res.status(401).json({message:"unauthorized"});
        const projects = await Project.find({ userId }).sort({ createdAt: -1 });
        res.json({projects});
    } catch (error:any) {
       res.status(500).json({message:error.message}) 
    }
}

//get projects by the id
export const getUserprojectbyID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth();
    if (!userId) return res.status(401).json({ message: "unauthorized" });

    const projectId = req.params.projectId as string;

    const project = await Project.findOne({
      id: projectId,
      userId: userId,
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }

    res.json({ project });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//get publish unpublish the projects
export const getToggleprojects=async(req:Request,res:Response)=>{
    try {
    const { userId } = req.auth();
    if (!userId) return res.status(401).json({ message: "unauthorized" });

    const projectId = req.params.id as string;

    const project = await Project.findOne({
      id: projectId,
      userId: userId,
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    if (!project?.generatedImage && !project?.generatedVideo) {
      return res.status(404).json({ message: "generate the video & image both first" });
    }
    await Project.updateOne({ id: projectId }, { isPublished: !project.isPublished });
    res.json({isPublished:!project.isPublished})

    } catch (error:any) {
       res.status(500).json({message:error.message}) 
    }
}