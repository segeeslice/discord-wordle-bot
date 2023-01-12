import { SapphireClient } from '@sapphire/framework';
import { env } from 'node:process';

const WORDLE_BOT_KEY_NAME = 'WORDLE_BOT_AUTH_TOKEN';

if (!env.hasOwnProperty(WORDLE_BOT_KEY_NAME)) {
    throw 'FATAL ERROR: The environment variable ' + WORDLE_BOT_KEY_NAME + ' was not found on the system.'
}

const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

client.login(env[WORDLE_BOT_KEY_NAME]);
