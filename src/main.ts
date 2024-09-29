import {
	type ChatInputCommandInteraction,
	Client,
	Events,
	GatewayIntentBits,
} from "discord.js";
import { indexCommands } from "./functions/indexCommands.js";

import { memberJoinTasks } from "./events/memberJoin.js";
import { memberLeaveTasks } from "./events/memberLeave.js";
import { memberUpdateTasks } from "./events/memberUpdate.js";
import { pushCommands } from "./functions/pushCommands.js";
import { handleCommand } from "./handler/slashCommand.js";

const commands = await indexCommands();

export const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

await pushCommands(commands);

client.once(Events.ClientReady, () => {
	console.log("Client Ready!");
});

client.on(Events.InteractionCreate, (interaction) => {
	if (interaction.isCommand()) {
		void handleCommand(interaction as ChatInputCommandInteraction, commands);
	}
});

client.on(Events.GuildMemberAdd, memberJoinTasks);
client.on(Events.GuildMemberRemove, memberLeaveTasks);
client.on(Events.GuildMemberUpdate, memberUpdateTasks);

await client.login(process.env["BOT_TOKEN"]);
