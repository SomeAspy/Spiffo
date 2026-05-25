import {
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";
import { deleteTag, findTag, getAllTags, newTag } from "../lib/mongo.ts";
export const data = new SlashCommandBuilder()
	.setName("tag")
	.setDescription("Manage tags")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("create")
			.setDescription("Make a new tag")
			.addStringOption((input) =>
				input
					.setRequired(true)
					.setName("trigger")
					.setDescription("What text will trigger this tag"),
			)
			.addStringOption((input) =>
				input
					.setRequired(true)
					.setName("content")
					.setDescription("Response to the trigger"),
			),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("delete")
			.setDescription("Delete a tag")
			.addStringOption((input) =>
				input
					.setRequired(true)
					.setName("trigger")
					.setDescription("Which tag to delete"),
			),
	)
	.addSubcommand((subcommand) =>
		subcommand.setName("list").setDescription("List all tags"),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	if (!interaction.inCachedGuild()) {
		return;
	}
	if (
		interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers) ||
		interaction.member.permissions.has(PermissionFlagsBits.ManageGuild) ||
		interaction.member.permissions.has(PermissionFlagsBits.Administrator)
	) {
		const trigger = interaction.options.getString("trigger")!;

		switch (interaction.options.getSubcommand()) {
			case "create":
				{
					await newTag(
						trigger.toLowerCase(),
						interaction.options.getString("content")!,
					);
				}
				await interaction.reply({
					flags: "Ephemeral",
					content: `Added ${trigger}`,
				});
				break;
			case "delete":
				{
					const tag = await findTag(trigger);
					if (!tag) {
						interaction.reply({
							flags: "Ephemeral",
							content: "The specified tag does not exist!",
						});
						return;
					}
					await deleteTag(trigger);
					await interaction.reply({
						flags: "Ephemeral",
						content: `Deleted ${trigger}`,
					});
				}
				break;
			case "list": {
				const tags = await getAllTags();
				let tagsString = "";
				tags.forEach((tag) => {
					tagsString += tag;
					tagsString += "\n";
				});
				void interaction.reply({
					content: `\`\`\`${tagsString}\`\`\``,
				});
			}
		}
	}
}
