import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

const WORDLE_REGEX: RegExp = /(Wordle) (\d+) (\d\/\d)/;

// Listener for the messageCreate event from discord.js:
// https://discord.js.org/#/docs/discord.js/v13/class/Client?scrollTo=e-messageCreate
export class MessageCreateListener extends Listener {

    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
        });
    }

    public async run(message: Message) {
        if (message.author.bot) return;
        if (!message.content) return;

        if (message.content.match(WORDLE_REGEX)) {
            message.react('👌');
        }
    }
}
