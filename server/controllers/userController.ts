import { Request, Response } from "express";
import { prisma } from "../configs/prisma.js";

//get user credits
export const getUsercredits=async(req:Request,res:Response)=>{
    try {
         const {userId}=req.auth();
        if(!userId) return res.status(401).json({message:"unauthorized"});
        const user = await prisma.user.findUnique({
            where:{id:userId}
        })
        res.json({credits:user?.credits});
    } catch (error:any) {
       res.status(500).json({message:error.message}) 
    }
}

//get user all projects
export const getUserprojects=async(req:Request,res:Response)=>{
    try {
        const {userId}=req.auth();
        if(!userId) return res.status(401).json({message:"unauthorized"});
        const projects = await prisma.project.findMany({
            where:{userId},
            orderBy:{createdAt:"desc"}
        })
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

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
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

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    if (!project?.generatedImage && !project?.generatedVideo) {
      return res.status(404).json({ message: "generate the video & image both first" });
    }
    await prisma.project.update({where:{        id: projectId},data:{isPublished:!project.isPublished}});
    res.json({isPublished:!project.isPublished})

    res.json({ project });
    } catch (error:any) {
       res.status(500).json({message:error.message}) 
    }
}