import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Gemini API Key missing. Chatbot will be disabled.");
}

// Initialize the API using the key from env
export const genAI = new GoogleGenerativeAI(apiKey || "dummy-key");

export const getEcoChatSession = () => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // We strictly use system instructions to give this chatbot a unique, specialized persona
    systemInstruction: "You are PlanetFix AI, an expert environmental and sustainability advisor. Your goal is to help users understand their carbon footprint, suggest eco-friendly habits, evaluate their emissions, and provide actionable tips. Do not answer questions completely unrelated to the environment, nature, app usage, software development, or sustainability. Keep your responses concise, friendly, extremely practical, and format nicely using plain text or minimalist emojis.",
  });
  
  return model.startChat({
    history: [],
  });
};
