import { EmbedBuilder, type TextChannel, type GuildMember } from "discord.js";
import { client } from "../main.js";

export function memberJoinTasks(member: GuildMember) {
	try {
		const embed = new EmbedBuilder()
			.setTitle(`Welcome <@${member.id}>`)
			.setThumbnail(member.avatarURL())
			.setTimestamp(Date.now())
			.setDescription("Welcome to the SalemTechSperts Discord Server!")
			.setColor("Random");
		(client.channels.cache.get("1151613732003250346") as TextChannel).send({
			embeds: [embed],
		});
	} catch {}
}
