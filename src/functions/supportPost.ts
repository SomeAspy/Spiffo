import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	type Message,
} from "discord.js";
import { askGemini } from "../lib/gemini.js";

const geminiPrompt =
	'Please create a title for this post that is under 50 characters. ONLY output the title and nothing else. If there is not enough info to make a title, return "More details needed". User\'s post: ';

const newSupportPostMessage = `
Please continue all discussion about your problem in this channel!
            
Keep in mind everyone who helps you with your problems are volunteers, and are not required to do so

If you do not get a response, you are probably not being ignored, we simply do not have any solution for your problem

SalemTechsperts and members of the server are not responsible for any further damage caused by following given advice.
            
# Rules
1. Do NOT ping <@&1149749390035128350> for help, only ping for moderation related issues
2. Do NOT make multiple posts for your issue

# Tips/Recommendations
1. In addition to model number, provide specs if it applies to your device
2. Include relevant error logs if applicable
3. Explain what lead up to the problem
4. Explain what you have already tried
5. Search the posts for your problem to see if it has already been solved
6. Do research into your problem beforehand
[More tips from iFixit](https://www.ifixit.com/Info/Asking_Great_Questions)
`;

const AttemptToSolvePrompt =
	"Please attempt to solve the user's problem. You cannot receive follow-up responses. Do NOT use any links in your response. Use Discord flavored MarkDown. Keep ALL responses under 1000 characters. If the user lacks important details, ask them to include them. The user's question is as follows: ";

export const pingSupportButton = new ButtonBuilder()
	.setCustomId("support.pingHelpers")
	.setStyle(ButtonStyle.Primary)
	.setEmoji("📣")
	.setLabel("Ping Support Helpers");

export const markSolvedButton = new ButtonBuilder()
	.setCustomId("support.solved")
	.setStyle(ButtonStyle.Success)
	.setEmoji("✅")
	.setLabel("Mark as Solved");

export async function supportPost(message: Message) {
	if (message.content.startsWith("no-ci")) {
		return;
	}

	const title = await askGemini(`${geminiPrompt}${message.content}`);
	const embed = new EmbedBuilder()
		.setTitle(`Hi ${message.author.displayName}!`)
		.setDescription(newSupportPostMessage);

	const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents([
		pingSupportButton,
		markSolvedButton,
	]);

	await message.startThread({ name: title }).then(async (thread) => {
		await thread
			.send({
				content: `<@${message.author.id}>`,
				embeds: [embed],
				components: [buttons],
			})
			.then((message) => {
				message.pin();
			});
		const AISolution = await askGemini(
			`${AttemptToSolvePrompt}${message.content}`,
		);
		if (AISolution !== "{Error generating AI response}") {
			try {
				void thread.send(`
## AI Generated Solution
⚠️ This solution is AI generated, therefore information may be inaccurate or out of date.
SalemTechsperts is not responsible for any damage that may occur following this advice.
If you aren't sure about it, wait for our support volunteers!
*although the AI may infer it, it cannot respond further*

${AISolution}
			`);
			} catch {
				/* AI will sometimes still generate solutions that are too long. */
			}
		}
	});
}
