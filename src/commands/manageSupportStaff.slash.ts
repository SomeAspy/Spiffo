import {
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("managesupportstaff")
	.setDescription("Manage support staff - Director only command!")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("add")
			.addMentionableOption((user) =>
				user.setRequired(true).setName("user").setDescription("User to modify"),
			)
			.setDescription("add a user to support staff"),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("remove")
			.addMentionableOption((user) =>
				user.setRequired(true).setName("user").setDescription("User to modify"),
			)
			.setDescription("remove a user from support staff"),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	try {
		if (!interaction.inCachedGuild()) {
			return;
		}
		if (
			interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers) ||
			interaction.member.permissions.has(PermissionFlagsBits.ManageRoles) ||
			interaction.member.permissions.has(PermissionFlagsBits.Administrator)
		) {
			const modifyUser = interaction.options.getMember("user")!;
			if (interaction.options.getSubcommand() === "add") {
				await modifyUser.roles.add("1305568566359101490"); // support jannies
			} else {
				await modifyUser.roles.remove("1305568566359101490"); // support jannies
				await modifyUser.roles.remove("1299461176350216234"); // support volunteers
			}
			interaction.reply(`Modified ${modifyUser.displayName}`);
		} else {
			void interaction.reply({
				flags: "Ephemeral",
				content: "You are not authorized to use this command!",
			});
		}
	} catch (e) {
		console.error(e);
	}
}
