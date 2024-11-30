import {
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("close")
	.setDescription("close this thread")
	.setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads);

export async function execute(interaction: ChatInputCommandInteraction) {
	if (interaction.channel?.isThread()) {
		interaction.reply(`Thread closed by ${interaction.user.displayName}`);
		interaction.channel.setLocked(true);
		interaction.channel.setArchived(true);
	}
}
