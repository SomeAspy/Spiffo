import type { ChatInputCommandInteraction } from "discord.js";
import type { CommandStore } from "../types/Command.js";

export async function handleCommand(
	interaction: ChatInputCommandInteraction,
	commands: CommandStore,
) {
	try {
		await commands.get(interaction.commandName)?.execute(interaction);
	} catch (error) {
		try {
			console.error(error);
			await interaction.reply({
				content: "Failed to execute command!",
				ephemeral: true,
			});
		} catch (replyError) {
			console.error(
				"Caught error replying to execution failure, but it failed!",
			);
			console.error(replyError);
		}
	}
}
