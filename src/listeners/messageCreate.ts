import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

import wordleResultParser from '../wordleResultParser';
import storage from '../storage';
import WordleResult from '../classes/WordleResult';

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

        let result: WordleResult | undefined = wordleResultParser.parseWordleResult(
            message.content,
            message.author.username);

        if (result == undefined) return;

        storage.saveWordleResult(result);
        message.react('👌');
    }
}
