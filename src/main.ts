import {
	ChatInputCommandInteraction,
	Client,
	Events,
	GatewayIntentBits,
} from "discord.js";
import { indexCommands } from "./functions/indexCommands.js";

import { config } from "dotenv";
import { pushCommands } from "./functions/pushCommands.js";
import { handleCommand } from "./handler/slashCommand.js";
config();

const commands = await indexCommands();

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

await pushCommands(commands);

client.once(Events.ClientReady, () => {
	console.log("Client Ready!");
});

client.on(Events.InteractionCreate, (interaction) => {
	if (interaction.isCommand()) {
		void handleCommand(
			interaction as ChatInputCommandInteraction,
			commands,
		);
	}
});

await client.login(process.env["BOT_TOKEN"]);
