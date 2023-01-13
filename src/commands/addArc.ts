import { ApplicationCommandRegistry, Command } from '@sapphire/framework';

import errorUtils from '../errorUtils';
import dateParser from '../dateParser';
import WordleArc from '../classes/WordleArc';

const START_DATE_OPTION_KEY: string = 'start_date';
const START_DATE_REQUIRED: boolean = true;

const END_DATE_OPTION_KEY: string = 'end_date';
const END_DATE_REQUIRED: boolean = false;

const ARC_NAME_OPTION_KEY: string = 'arc_name';
const ARC_NAME_REQUIRED: boolean = false;

export class AddArcCommand extends Command {

    public constructor (context: Command.Context, options: Command.Options) {
        super( context, {
            ...options,
            description: 'Add an arc over a specified timeline.',
        });
    }

    public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand(
            (builder) => builder
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) => option
                    .setName(START_DATE_OPTION_KEY)
                    .setDescription('Date this arc should begin (format YYYY-MM-DD)')
                    .setRequired(START_DATE_REQUIRED))
                .addStringOption((option) => option
                    .setName(END_DATE_OPTION_KEY)
                    .setDescription('Date this arc should end (format YYYY-MM-DD)')
                    .setRequired(END_DATE_REQUIRED))
                .addStringOption((option) => option
                    .setName(ARC_NAME_OPTION_KEY)
                    .setDescription('Name of the arc (defaults to the start date)')
                    .setRequired(ARC_NAME_REQUIRED)),

            {
                // A command's "ID" is registered when first used.
                // If we don't provide Sapphire with the ID it has, old ones can lay hanging.
                // By providing this, we help Sapphire to remove / overwrite old ones automatically.
                idHints: [ '1063514304512536697' ]
            }
        );
    }

    public override async chatInputRun(interaction: Command.ChatInputInteraction)
    {
        let parsedArc: WordleArc;

        try {
            parsedArc = this.parseArguments(interaction);
        } catch (err: any) {
            // TODO: Is there a way to make this formatted like an error?
            interaction.reply({content: errorUtils.getErrorMessage(err)});
            return;
        }

        // TODO: Save this in storage
        console.log(parsedArc);
        interaction.reply('Arc parsed!');
    }

    private parseArguments(interaction: Command.ChatInputInteraction) : WordleArc {

        const rawStartDate: string | null = interaction.options.getString(
            START_DATE_OPTION_KEY,
            START_DATE_REQUIRED);

        if (!rawStartDate) {
            throw `${START_DATE_OPTION_KEY} is required.`;
        }

        const startDate : Date | undefined = dateParser.parseDate(rawStartDate);
        if (!startDate) {
            throw `Given ${START_DATE_OPTION_KEY} is invalid.`;
        }

        const rawEndDate: string | null = interaction.options.getString(
            END_DATE_OPTION_KEY,
            END_DATE_REQUIRED);

        const endDate : Date | undefined = !rawEndDate ? undefined : dateParser.parseDate(rawStartDate);
        if (rawEndDate && !endDate) {
            throw `Given ${END_DATE_OPTION_KEY} is invalid.`;
        }

        const rawArcName: string | null = interaction.options.getString(
            ARC_NAME_OPTION_KEY,
            ARC_NAME_REQUIRED);

        const arcName : string = rawArcName ?? startDate.toDateString();

        return new WordleArc(arcName, startDate, endDate);
    }
}
