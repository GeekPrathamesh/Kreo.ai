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