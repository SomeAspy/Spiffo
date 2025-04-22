import { getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { MemberData, ServerData, TagData } from "../types/schemas.js";

console.log("connecting to db...");
await mongoose.connect(
	`mongodb://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@mongo:27017/SpiffoBot?authSource=admin`,
);

const db = mongoose.connection.db;

const newServer = async (serverID: string) => {
	await new (getModelForClass(ServerData))({
		serverID,
		memberData: [],
		prefixes: ["-"],
		tags: [],
	}).save();
};

const newMember = async (memberID: string) => {
	await new (getModelForClass(MemberData))({
		memberID,
		notes: [],
	}).save();
};

export const newTag = async (trigger: string, content: string) => {
	await new (getModelForClass(TagData))({
		trigger,
		content,
		enabled: true,
	}).save();
};

export async function findTag(triggerName: string) {
	return await getModelForClass(TagData).findOne({
		trigger: triggerName,
	});
}
