import type {
	ButtonInteraction,
	ChatInputCommandInteraction,
	SlashCommandOptionsOnlyBuilder,
} from "discord.js";

interface Button {
	id: string;
	execute: (interaction: ButtonInteraction) => Promise<void>;
}

export interface Command {
	data: SlashCommandOptionsOnlyBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
	buttons: Button[];
}

export type CommandStore = Map<string, Command>;
