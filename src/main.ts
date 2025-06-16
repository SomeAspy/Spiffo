import "reflect-metadata";

import {
	AutocompleteInteraction,
	type ChatInputCommandInteraction,
	Client,
	Events,
	GatewayIntentBits,
} from "discord.js";
import { indexCommands } from "./functions/indexCommands.js";

import { pushCommands } from "./functions/pushCommands.js";
import { handleButton } from "./handler/handleButton.js";
import { handleMessage } from "./handler/message.js";
import { handleCommand } from "./handler/slashCommand.js";

const commands = await indexCommands();

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
	],
});

await pushCommands(commands);

client.once(Events.ClientReady, () => {
	console.log("Client Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
	try {
		if (
			interaction.channel?.isDMBased() &&
			!(interaction instanceof AutocompleteInteraction)
		) {
			interaction.reply("This bot is not intended to be used in DMs");
		}
		if (interaction.isCommand()) {
			await handleCommand(interaction as ChatInputCommandInteraction, commands);
		} else if (interaction.isButton()) {
			await handleButton(interaction, commands);
		}
	} catch (error) {
		console.error(error);
	}
});

client.on(Events.MessageCreate, (message) => {
	//if (!message.author.bot) {
	void handleMessage(message);
	//}
});

await client.login(process.env["BOT_TOKEN"]);
