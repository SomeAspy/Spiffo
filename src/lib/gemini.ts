import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPI = new GoogleGenerativeAI(process.env["GEMINI_KEY"]!);

function timeout(time: number) {
	return new Promise<never>((_, reject) => {
		setTimeout(() => {
			reject("Timeout");
		}, time);
	});
}

async function geminiAPIRequest(question: string) {
	return new Promise<string>((resolve, reject) => {
		const reply = geminiAPI
			.getGenerativeModel({ model: "gemini-1.5-flash" })
			.generateContent([question]);
		reply
			.then((res) => {
				resolve(res.response.text());
			})
			.catch((e) => {
				console.error(e);
				reject("Gemini Error");
			});
	});
}

export async function askGemini(question: string) {
	try {
		return await Promise.race([timeout(5000), geminiAPIRequest(question)]);
	} catch {
		return "{Error generating AI response}";
	}
}
