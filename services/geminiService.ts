import { GoogleGenAI } from "@google/genai";
import { ThreadInputData, GeneratedThreadResponse } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateThreadContent = async (
  data: ThreadInputData
): Promise<GeneratedThreadResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image", // Using the requested model
      contents: JSON.stringify(data),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Removed responseMimeType: "application/json" to allow text output
        temperature: 0.7, 
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("Empty response from Gemini.");
    }

    // Return the raw text wrapped in the response object
    return { content: textResponse };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
