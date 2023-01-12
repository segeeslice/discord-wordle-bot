import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

// Listener for the messageCreate event from discord.js:
// https://discord.js.org/#/docs/discord.js/v13/class/Client?scrollTo=e-messageCreate
export class MessageCreateListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
        });
    }

    public run(message: Message) {
        console.log("Received message: " + message);
    }
}
