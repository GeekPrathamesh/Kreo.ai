import { GoogleGenAI } from "@google/genai";


export const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});