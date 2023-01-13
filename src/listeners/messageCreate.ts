import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

import wordleArcParser from '../wordleArcParser';
import wordleResultParser from '../wordleResultParser';
import storage from '../storage';
import WordleResult from '../classes/WordleResult';
import WordleArc from '../classes/WordleArc';

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

        this.listenForWordleResult(message);
        this.listenForWordleArc(message);
    }

    private async listenForWordleResult(message: Message) {
        let result: WordleResult | undefined = wordleResultParser.parseWordleResult(
            message.content,
            message.author.username);

        if (result == undefined) return;

        storage.saveWordleResult(result);
        message.react('👌');
    }

    private async listenForWordleArc(message: Message) {
        let arcResult: WordleArc | undefined = wordleArcParser.parseArcInformation(message.content);

        if (arcResult == undefined) return;
        storage.saveArcInformation(arcResult);
        message.react('👌');
    }
}
