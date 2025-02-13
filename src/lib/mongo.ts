import { MongoClient } from "mongodb";

const mongo = new MongoClient(
	`mongodb+srv://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@127.0.0.1:27017/SpiffoBot`,
);

mongo.db().collection().
