import {
	EmbedBuilder,
	type TextChannel,
	type GuildMember,
	type PartialGuildMember,
} from "discord.js";
import { client } from "../main.js";

export function memberLeaveTasks(member: GuildMember | PartialGuildMember) {
	try {
		const embed = new EmbedBuilder()
			.setTitle(`${member.displayName} has left.`)
			.setTimestamp(Date.now())
			.setDescription(member.id)
			.setColor("Red");
		(client.channels.cache.get("1151613732003250346") as TextChannel).send({
			embeds: [embed],
		});
	} catch {}
}
