import { prop } from "@typegoose/typegoose";

export class TagData {
	@prop({ type: () => String, required: true }) // Explicit type
	trigger!: string;

	@prop({ type: () => String, required: true }) // Explicit type
	content!: string;

	@prop({ type: () => Boolean, required: true }) // Explicit type
	enabled!: boolean;
}

export class MemberData {
	@prop()
	public userID!: string;
}

export class ServerData {
	@prop()
	public serverID!: string;

	@prop()
	memberData!: MemberData[];

	@prop({})
	prefixes!: string[];

	@prop({})
	tags!: TagData[];
}
