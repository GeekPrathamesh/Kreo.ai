import mongoose from "mongoose";
import crypto from "crypto";

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => crypto.randomUUID(), unique: true },
    name: { type: String, required: true },
    userId: { type: String, required: true }, // Referencing User.id
    productName: { type: String, required: true },
    productDescription: { type: String, default: "" },
    userPrompt: { type: String, default: "" },
    aspectRatio: { type: String, default: "9:16" },
    targetLength: { type: Number, default: 5 },
    uploadedImages: { type: [String], default: [] },
    generatedImage: { type: String, default: "" },
    generatedVideo: { type: String, default: "" },
    isGenerating: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    error: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
