import { Request, Response } from "express";
import { prisma } from "../configs/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import { GenerateContentConfig, HarmCategory } from "@google/genai";
import { HarmBlockThreshold } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { ai } from "../configs/ai.js";

const loadImage = (path: string, mimeType: string) => {
  return {
    inlineData: {
      data: fs.readFileSync(path).toString('base64'),
      mimeType
    }
  }
}

// create the new project
export const createProject = async (req: Request, res: Response) => {
  let tempProjectId: string;
  const { userId } = req.auth();
  let isCreditdeducted = false;
  const {
    name = "new project",
    aspectRatio,
    userPrompt,
    productName,
    productDescription,
    targetLengh = 5,
  } = req.body;

  const images: any = req.files;
  if (images.length < 2 || !productName)
    return res.status(400).json({ message: "upload atleast 2 imgs" });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.credits < 5)
    return res.status(401).json({ message: "insufficient credits" });
  else {
    //deduct credits first
    await prisma.user
      .update({
        where: {
          id: userId,
        },
        data: { credits: { decrement: 5 } },
      })
      .then(() => {
        isCreditdeducted = true;
      });
  }
  try {
    let uploadedImages = await Promise.all(
      images.map(async (item: any) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const project = await prisma.project.create({
      data: {
        name,
        userId,
        productName,
        productDescription,
        aspectRatio,
        userPrompt,
        targetLength: parseInt(targetLengh),
        uploadedImages,
        isGenerating:true
      },
    });
    tempProjectId=project.id;

    const model="gemini-3-pro-image-preview";
    const generationConfig:GenerateContentConfig={
        maxOutputTokens:32768,
        temperature:1,
        topP:0.95,
        responseModalities:["IMAGE"],
        imageConfig:{
          aspectRatio:aspectRatio||"9:16",
          imageSize:"1K"
        },
        safetySettings:[
           {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.OFF,
  },
           {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.OFF,
  },
           {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.OFF,
  },
           {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.OFF,
  }
        ]
    }

    //image to base64 for ai model
    const img1base64 = loadImage(images[0].path,images[0].mimeType);
    const img2base64 = loadImage(images[2].path,images[2].mimeType);

const prompt = {
  text: `Combine the person and product into a realistic photo.
Make the person naturally hold or use the product.
Match lighting, shadows, scale and perspective.
Make the person stand in professional studio lighting.
Output ecommerce-quality photo realistic imagery.
${userPrompt}`
}

// generate response by ai model
const response:any=await ai.models.generateContent({model,contents:[img1base64,img2base64,prompt],config:generationConfig,})

//check response valid
if(!response?.candidates?.[0]?.content?.parts){
  throw new Error("unexpected response")
}

const parts=response.candidates[0].content.parts;
let finalBuffer:Buffer|null=null;
for (const part of parts) {
  if (part.inlineData) {
    finalBuffer = Buffer.from(part.inlineData.data, 'base64');
  }
}

if (!finalBuffer) {
  throw new Error('Failed to generate image');
}

const base64Image = `data:image/png;base64,${finalBuffer.toString('base64')}`;

const uploadResult = await cloudinary.uploader.upload(base64Image, {
  resource_type: 'image'
});
await prisma.project.update({
  where:{id:project.id},
  data:{
    generatedImage:uploadResult.secure_url,isGenerating:false
  }
})
res.json({projectId:project.id})
} catch (error: any) {
  if (tempProjectId!) {
  // update project status and error message
  await prisma.project.update({
    where: { id: tempProjectId },
    data: { isGenerating: false, error: error.message }
  });
}

if (isCreditdeducted) {
  // add credits back
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: 5 } }
  });
}

    res.status(500).json({ message: error.message });
  }
};

// create the new video
export const createVideo = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//get published projects
export const getPublishedprojects = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//delete that project by id
export const deleteProject = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
