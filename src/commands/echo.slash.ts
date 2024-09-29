import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("echo")
	.setDescription("Echo a given string")
	.addStringOption((option) =>
		option
			.setName("string")
			.setRequired(true)
			.setDescription("The string to echo"),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.reply(interaction.options.getString("string")!);
}
