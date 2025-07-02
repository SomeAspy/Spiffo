import type { Message } from "discord.js";
import { supportPost } from "../functions/supportPost.js";
import { findTag } from "../lib/mongo.js";

export async function handleMessage(message: Message) {
	if (message.channelId === process.env["SUPPORT_CHANNEL"]) {
		supportPost(message);
	}
	try {
		const splitMessage = message.content.split(" ");
		if (splitMessage.length === 1) {
			findTag(message.content.split(" ")[0]!.toLowerCase()).then((tag) => {
				if (!tag) {
					return;
				}
				message.reply(tag.content);
			});
		}
	} catch (e) {
		console.error(e);
	}
}
