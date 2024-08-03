import { readdirSync } from "fs";
import type { Command } from "../types/Command.js";

export async function indexCommands() {
	const commands = new Map<string, Command>();
	for (const file of readdirSync(`${import.meta.dirname}/../commands/`)) {
		const fileData = (await import(
			`${import.meta.dirname}/../commands/${file}`
		)) as Command;
		try {
			commands.set(fileData.data.name, fileData);
		} catch (error) {
			console.error(
				`Tried to parse ${import.meta.dirname}/../commands/${file} but failed!`,
			);
			console.error(error);
		}
	}
	console.log(
		`Finished indexing commands, found ${commands.size.toString()} commands`,
	);
	return commands;
}
