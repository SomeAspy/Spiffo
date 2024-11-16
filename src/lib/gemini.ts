import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPI = new GoogleGenerativeAI(process.env["GEMINI_KEY"]!);

export async function askGemini(question: string) {
	try {
		const reply = await geminiAPI
			.getGenerativeModel({ model: "gemini-1.5-flash" })
			.generateContent([question]);
		return reply.response.text();
	} catch (error) {
		console.error("Gemini Error!");
		return "{Gemini failed to produce output}";
	}
}
