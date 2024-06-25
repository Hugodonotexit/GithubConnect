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

client.on('messageCreate', async message => {
    const currentDateTime = new Date().toLocaleString();
    console.log(`[${currentDateTime}] ${message.author.username}: ${message.content}`);
    if (message.content.startsWith('!gc')) {
        const args = message.content.split(' ');
        switch (args[1]) {
            case 'user':
                switch (args.length) {
                    case 3:
                        await functions.usr(args[2],message);
                    break
                    case 4:
                        switch (args[3]) {
                            case 'repos':
                                await functions.listrepos(args[2],message);
                            break;
                        }
                    break;
                }
                
            break;
            case 'repo':
                switch (args.length) {
                    case 3:
                        await functions.repo(args[2],message);
                    break
                    case 4:
                        const str = args[2] + '/' + args[3];
                        await functions.repo(str,message);
                    break;
                }
            break;
            case 'Hugodonotexit':
                await message.channel.send("Bro is depressed");
                await functions.usr(args[1],message);
            break;
            case 'help':
                await functions.help(message);
            break;
            default:
                await message.channel.send('Invalid command. Use !gc help for help.');
            break;
        }
  
    } else if (message.content.startsWith('!depressing')) {
        const executablePath = './depressingQuote.out';
        execFile(executablePath, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing the C++ program: ${error.message}`);
                return;
            }
        
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            message.channel.send(`${stdout}`);
    });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);