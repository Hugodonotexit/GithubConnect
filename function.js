
import fetch from 'node-fetch';

export async function help(message) {
    const helpEmbed = {
    color: 0x0099ff, // You can use any hex color code
    title: 'Help Commands',
    description: 'Here are the available commands:',
    fields: [
        { name: 'User Commands', 
            value: '🔹 **user <username>** - Show user detail\n' +
                   '🔹 **user <username> repos** - List of user\'s repos', 
                   inline: false },
        { name: 'Repo Commands', 
            value: '🔹 **repo <username> <repo>** - Show repo\'s detail', 
                   inline: false }
    ]
    }
    await message.channel.send({ embeds: [helpEmbed] });
}
export async function usr(username,message) {
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

export async function listrepos(username,message) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('User not found');
        }
    
        const repos = await response.json();
        const embed = {
            color: 0x00ff00,
            title: `${username}'s GitHub Repositories`,
            fields: repos.map(repo => ({
                name: repo.name,
                value: `[${repo.html_url}]\n${repo.description || 'No description'}`,
                inline: false
            }))
    }
        await message.channel.send({ embeds: [embed] });
    } catch (error) {
        message.channel.send('Error fetching GitHub data: ' + error.message);
    }
}

export async function repo(str,message) {
    try {
        const response = await fetch(`https://api.github.com/repos/${str}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
    
        const repo = await response.json();
        const embed = {
            color: 0x00ff00,
            title: repo.name,
            fields: [
                { name: 'URL:', value: repo.html_url, inline: false },
                { name: 'Description:', value: repo.description, inline: true },
                { name: 'language', value: repo.language, inline: true },
                { name: 'Fork Cout:', value: repo.forks, inline: true },
                { name: 'Open Issues:', value: repo.open_issues, inline: true },
                { name: 'Watchers', value: repo.watchers, inline: true },
                { name: 'Subscribers', value: repo.subscribers_count, inline: true },
            ]
    }
        await message.channel.send({ embeds: [embed] });
    } catch (error) {
        message.channel.send('Error fetching GitHub data: ' + error.message);
    }
}