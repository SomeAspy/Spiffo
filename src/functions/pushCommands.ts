import {
	REST,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from "discord.js";

import type { CommandStore } from "../types/Command.js";

export async function pushCommands(commands: CommandStore) {
	const restClient = new REST().setToken(process.env["BOT_TOKEN"]!);

	const commandDataJSON: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	commands.forEach((command) => {
		if (command.data.name !== "ignore") {
			commandDataJSON.push(command.data.toJSON());
		}
	});

	console.log(`Pushing ${commands.size.toString()} commands`);

	await restClient.put(Routes.applicationCommands(process.env["CLIENT"]!), {
		body: commandDataJSON,
	});
}
