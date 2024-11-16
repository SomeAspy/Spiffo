import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPI = new GoogleGenerativeAI(process.env["GEMINI_KEY"]!);

const timeout = new Promise<never>((_, reject) => {
	setTimeout(() => {
		reject(new Error("Promise timeout"));
	}, 2000);
});

export async function askGemini(question: string) {
	try {
		return Promise.race([timeout, geminiAPIRequest(question)]);
	} catch (error) {
		console.error("Gemini Error!");
		return "{Gemini failed to produce output [timeout]}";
	}
}

async function geminiAPIRequest(question: string) {
	const reply = await geminiAPI
		.getGenerativeModel({ model: "gemini-1.5-flash" })
		.generateContent([question]);
	return reply.response.text();
}
