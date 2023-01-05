import { SapphireClient } from '@sapphire/framework';

const client = new SapphireClient({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

// TODO: Pull auth token from the environment variables
client.login('');
