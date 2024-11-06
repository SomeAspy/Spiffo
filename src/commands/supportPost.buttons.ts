import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonInteraction,
	type ThreadChannel,
	SlashCommandBuilder,
} from "discord.js";
import {
	markSolvedButton,
	pingSupportButton,
} from "../functions/supportPost.js";

export const data = new SlashCommandBuilder().setName("ignore");

async function isOriginalPoster(
	interaction: ButtonInteraction,
): Promise<boolean> {
	const thread = interaction.channel as ThreadChannel;
	try {
		const firstMessage = await thread.fetchStarterMessage();
		return firstMessage!.author.id === interaction.user.id;
	} catch {
		await interaction.reply("Original post was deleted!");
		await thread.setLocked();
		await thread.setArchived();
		// Halt further execution
		throw new Error("[NON-ERROR]: No first message");
	}
}

function disableButton(button: ButtonBuilder) {
	return ButtonBuilder.from(button).setDisabled();
}

export const buttons = [
	{
		id: "support.pingHelpers",
		execute: async (interaction: ButtonInteraction) => {
			if (!(await isOriginalPoster(interaction))) {
				interaction.reply({
					ephemeral: true,
					content: "You are not the owner of this thread!",
				});
				return;
			}
			await interaction.update({
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents([
						disableButton(pingSupportButton),
						markSolvedButton,
					]),
				],
			});
			await (interaction.channel as ThreadChannel).send(
				"<@&1299461176350216234>",
			);
		},
	},
	{
		id: "support.solved",
		execute: async (interaction: ButtonInteraction) => {
			const thread = interaction.channel as ThreadChannel;
			if (!(await isOriginalPoster(interaction))) {
				interaction.reply({
					ephemeral: true,
					content: "You are not the owner of this thread!",
				});
				return;
			}
			await interaction.update({
				components: [
					new ActionRowBuilder<ButtonBuilder>().addComponents([
						disableButton(pingSupportButton),
						disableButton(markSolvedButton),
					]),
				],
			});
			await thread.send(
				"The author has marked this post as solved, now closing!",
			);
			await thread.setLocked();
			await thread.setArchived();
		},
	},
];
