import {
	type ChatInputCommandInteraction,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("supportmute")
	.setDescription("Mute a person from tech support")
	.addSubcommand((subcommand) =>
		subcommand
			.setName("mute")
			.addMentionableOption((user) =>
				user.setRequired(true).setName("user").setDescription("User to modify"),
			)
			.setDescription("Mute a user from tech support"),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName("unmute")
			.addMentionableOption((user) =>
				user.setRequired(true).setName("user").setDescription("User to modify"),
			)
			.setDescription("Unmute a user from tech support"),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	try {
		if (!interaction.inCachedGuild()) {
			return;
		}
		if (
			interaction.member.roles.cache.has("1315433023252201543") || // support director
			interaction.member.permissions.has(PermissionFlagsBits.ManageRoles) ||
			interaction.member.permissions.has(PermissionFlagsBits.Administrator)
		) {
			const modifyUser = interaction.options.getMember("user")!;
			if (interaction.options.getSubcommand() === "mute") {
				await modifyUser.roles.add("1316492061213720677"); // support mute
			} else {
				await modifyUser.roles.remove("1316492061213720677"); // support mute
			}
			interaction.reply(`Modified ${modifyUser.displayName}`);
		} else {
			void interaction.reply({
				ephemeral: true,
				content: "You are not authorized to use this command!",
			});
		}
	} catch (e) {
		console.error(e);
	}
}
