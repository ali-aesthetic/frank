import OpenAI from "openai";

/**
 * OpenAI client for Whisper STT (voice brain dump).
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? "",
});
