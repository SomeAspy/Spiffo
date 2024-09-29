import {
	EmbedBuilder,
	type TextChannel,
	type GuildMember,
	type PartialGuildMember,
} from "discord.js";
import { client } from "../main.js";

export function memberUpdateTasks(
	oldMember: GuildMember | PartialGuildMember,
	newMember: GuildMember,
) {
	try {
		if (
			// Youtube Member role
			newMember.roles.cache.has("1282376216065609880") &&
			!oldMember.roles.cache.has("1282376216065609880")
		) {
			const generalEmbed = new EmbedBuilder()
				.setTitle(`Welcome to the Gooch Team <@${newMember.id}>!`)
				.setThumbnail(newMember.avatarURL())
				.setTimestamp(Date.now())
				.setDescription(
					`${newMember.displayName} has become a member of the Gooch Team!`,
				)
				.setColor("Random");
			// Send to General
			(client.channels.cache.get("1130327724620271687") as TextChannel).send({
				embeds: [generalEmbed],
			});

			// Send to Members Only channel
			(client.channels.cache.get("1282376767193092287") as TextChannel).send(
				`Welcome to The Dumpster <@${newMember.id}>!`,
			);
		}
	} catch {}
}
