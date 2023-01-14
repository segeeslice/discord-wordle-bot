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

        this.listenForWordleResult(message);
    }

    private async listenForWordleResult(message: Message) {
        const result: WordleResult | undefined = wordleResultParser.parseWordleResult(
            message.content,
            message.author.username);

        if (result == undefined) return;

        await storage.saveWordleResult(result);

        // Calculate comparative scores
        // TODO: Separate method
        const relatedResults: { [key: string]: WordleResult} | undefined = await storage.getWordleResults(result.wordleNumber);
        if (relatedResults == undefined) {
            message.reply('Something went wrong saving this result...');
            return;
        }

        const comparativeResults: Array<WordleResult> = this.calculateComparativeResults(relatedResults);
        await storage.updateComparativeResults(comparativeResults);

        message.react('👌');
    }

    private calculateComparativeResults(relatedResults: {[key: string]: WordleResult}) : Array<WordleResult> {
        const usernames: Array<string> = Object.keys(relatedResults);

        const lowestScore: number = usernames
            .map(username => relatedResults[username].score)
            .reduce((lowestScore, nextScore) => {
                return Math.min(lowestScore, nextScore);
            });

        const numberUsersWithLowestScore: number = usernames
            .filter(username => relatedResults[username].score == lowestScore)
            .length;

        const comparativeResults: Array<WordleResult> = [];
        for (const username in relatedResults) {
            const relatedResult: WordleResult = relatedResults[username];

            const comparativeScore: number = relatedResult.score == lowestScore
                ? numberUsersWithLowestScore == 1
                    ? 3
                    : 1
                : 0;

            comparativeResults.push(new WordleResult(
                relatedResult.wordleNumber,
                relatedResult.username,
                comparativeScore));
        };

        return comparativeResults;
    }
}
