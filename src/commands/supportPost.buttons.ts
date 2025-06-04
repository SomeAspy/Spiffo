import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonInteraction,
	SlashCommandBuilder,
	type TextChannel,
	type ThreadChannel,
} from "discord.js";
import {
	markSolvedButton,
	pingSupportButton,
} from "../functions/supportPost.js";

export const data = new SlashCommandBuilder().setName("ignore");

async function isAbleToManage(
	interaction: ButtonInteraction,
): Promise<boolean> {
	const thread = interaction.channel as ThreadChannel;
	try {
		await interaction.channel?.fetch();
		const firstMessage = await thread.fetchStarterMessage();
		return (
			firstMessage!.author.id === interaction.user.id ||
			thread.permissionsFor(interaction.user)!.has("ManageChannels")
		);
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
			if (!(await isAbleToManage(interaction))) {
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
				"Request for support sent, please hold!",
			);
			(
				interaction.client.channels.cache.get(
					"1305571250499883018",
				)! as TextChannel
			).send(
				`Help requested in https://canary.discord.com/channels/${interaction.guildId}/${interaction.channelId}! <@&1299461176350216234>`,
			);
		},
	},
	{
		id: "support.solved",
		execute: async (interaction: ButtonInteraction) => {
			const thread = interaction.channel as ThreadChannel;
			if (!(await isAbleToManage(interaction))) {
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
				`${interaction.user.displayName} has marked this post as solved, now closing!`,
			);
			await thread.setLocked();
			await thread.setArchived();
		},
	},
];
