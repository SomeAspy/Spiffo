import { MongoClient } from "mongodb";
import type { TagData } from "../types/schemas.js";

// not wrapped in try/catch because the bot cannot function without this
console.info("Connecting to MongoDB instance...");
const mongodb = new MongoClient(process.env.MONGODB!);
await mongodb.connect();
await mongodb.db().command({ ping: 1 });
console.info("Received reply from MongoDB!");

export async function newTag(trigger: string, content: string) {
	await mongodb
		.db()
		.collection<TagData>("tags")
		.insertOne({ trigger, content });
}

export async function findTag(trigger: string) {
	return await mongodb
		.db()
		.collection<TagData>("tags")
		.findOne<TagData>({ trigger });
}

export async function deleteTag(trigger: string) {
	await mongodb.db().collection<TagData>("tags").deleteOne({ trigger });
}

export async function getAllTags() {
	return await mongodb.db().collection<TagData>("tags").distinct("trigger");
}
