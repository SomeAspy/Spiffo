import type { Message } from "discord.js";
import { supportPost } from "../functions/supportPost.js";

export async function handleMessage(message: Message) {
	if (message.channelId === process.env["SUPPORT_CHANNEL"]) {
		supportPost(message);
	}
}
