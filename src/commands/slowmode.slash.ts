import {
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("slowmode")
	.setDescription("Slowmode the channel")
	.addIntegerOption((option) =>
		option
			.setName("time")
			.setRequired(true)
			.setDescription("Time in seconds to slowmode")
			.setMinValue(0),
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels);

export async function execute(interaction: ChatInputCommandInteraction) {
	if (interaction.inGuild()) {
		interaction.channel?.setRateLimitPerUser(
			interaction.options.getInteger("time")!,
		);
		interaction.reply(
			`Set slowmode to ${interaction.options.getInteger("time")!}s for this channel`,
		);
	}
}
