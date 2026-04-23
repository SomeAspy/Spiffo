import {
	type GenerateContentConfig,
	GoogleGenAI,
	type Part,
} from "@google/genai";

const geminiAPI = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

export async function askGemini(
	contents: Part[],
	config: GenerateContentConfig = {},
) {
	const response = await geminiAPI.models.generateContent({
		model: "gemini-3.1-flash-lite-preview",
		contents,
		config,
	});
	if (response.text == null || response.text === "") {
		throw new Error(`Blocked: ${response.candidates?.[0]?.finishReason}`);
	}
	return response.text;
}
