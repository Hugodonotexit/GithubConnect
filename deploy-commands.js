import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const commands = [
    {
        name: 'gc',
        description: 'Various GitHub commands',
        options: [
            {
                name: 'user',
                type: 1, // SUB_COMMAND
                description: 'Get user information',
                options: [
                    {
                        name: 'username',
                        type: 3, // STRING
                        description: 'GitHub username',
                        required: true,
                    },
                    {
                        name: 'repos',
                        type: 3, // STRING
                        description: 'List repos of the user',
                        required: false,
                    },
                ],
            },
            {
                name: 'repo',
                type: 1, // SUB_COMMAND
                description: 'Get repository information',
                options: [
                    {
                        name: 'name',
                        type: 3, // STRING
                        description: 'Repository name',
                        required: true,
                    },
                    {
                        name: 'owner',
                        type: 3, // STRING
                        description: 'Repository owner',
                        required: false,
                    },
                ],
            },
            {
                name: 'help',
                type: 1, // SUB_COMMAND
                description: 'Get help information',
            },
        ],
    },
    {
        name: 'depressing',
        description: 'Get a depressing quote',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_BOT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();