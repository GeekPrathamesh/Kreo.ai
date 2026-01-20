export interface Generation {
  id: string;
  aspectRatio: string;
  productDescription: string;
  productName: string;
  targetLength: number;
  uploadedImages: string[];
  userId: string;
  userPrompt: string;
  generatedImage: string;
  generatedVideo: string;
  isGenerating: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Project = {
  id: string;
  name: string;
  userId: string;
  productName: string;
  productDescription: string;
  userPrompt: string;
  aspectRatio: "9:16" | "16:9";
  targetLength: number;
  uploadedImages: string[];
  generatedImage: string;
  generatedVideo: string;
  isGenerating: boolean;
  isPublished: boolean;
  error: string;
};
