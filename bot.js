import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

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
    if (message.content.startsWith('!github')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            message.channel.send('Please provide a GitHub username.');
            return;
        }

        const username = args[1];
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('User not found');
            }

            const data = await response.json();
            const embed = {
                color: 0x0099ff,
                title: data.login,
                url: data.html_url,
                description: data.bio || 'No bio available',
                fields: [
                    { name: 'Public Repos', value: data.public_repos.toString(), inline: true },
                    { name: 'Followers', value: data.followers.toString(), inline: true },
                    { name: 'Following', value: data.following.toString(), inline: true }
                ],
                image: {
                    url: data.avatar_url
                },
                timestamp: new Date(),
                footer: {
                    text: 'GitHub User Info',
                    icon_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
                }
            };

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            message.channel.send('Error fetching GitHub data: ' + error.message);
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);