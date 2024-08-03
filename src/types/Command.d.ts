import type {
	ChatInputCommandInteraction,
	SlashCommandOptionsOnlyBuilder,
} from "discord.js";

export interface Command {
	data: SlashCommandOptionsOnlyBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export type CommandStore = Map<string, Command>;
