import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import * as functions from './function.js';
import { execFile } from 'child_process';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const currentDateTime = new Date().toLocaleString();
    console.log(`[${currentDateTime}] ${interaction.user.tag}: ${interaction.commandName} ${interaction.options.data.map(option => `${option.name}: ${option.value}`).join(', ')}`);
    
    const { commandName, options } = interaction;

    if (commandName === 'gc') {
        const subCommand = options.getSubcommand();
        if (subCommand === 'user') {
            const username = options.getString('username');
            const repos = options.getString('repos');
            if (repos) {
                await functions.listrepos(username, interaction);
            } else {
                await functions.usr(username, interaction);
            }
        } else if (subCommand === 'repo') {
            const name = options.getString('name');
            const owner = options.getString('owner');
            const repoPath = owner ? `${owner}/${name}` : name;
            await functions.repo(repoPath, interaction);
        } else if (subCommand === 'help') {
            await functions.help(interaction);
        }
    } else if (commandName === 'depressing') {
        const executablePath = './depressingQuote.out';
        execFile(executablePath, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing the C++ program: ${error.message}`);
                interaction.reply('There was an error executing the C++ program.');
                return;
            }
        
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                interaction.reply('There was an error in the C++ program.');
                return;
            }

            interaction.reply(`${stdout}`);
        });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);