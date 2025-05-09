const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { getMonitoredChannels, loadDbToCache, initializeDatabase } = require('./channels.js');

require('dotenv').config();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Load commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

loadCommands(foldersPath, commandFolders);

// Login to bot
try {
    client.login(token);
} catch (err) {
    console.log(`Failed to login: ${err.message}`);
}

// Load database
initializeDatabase();
client.once('ready', () => {loadDbToCache(client);});

// Process slash commands
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.member.permissions.has("ADMINISTRATOR"))
        return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true });

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    try {
        console.log(`Executing interaction ${interaction.commandName}`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Delete new non-media messages in media-only channels
client.on("messageCreate", async (message) => {
    if (getMonitoredChannels().has(message.channel) == false) return;
    if (message.author.bot) return;

    const {allowAttachments, allowEmbedded} = getMonitoredChannels().get(message.channel);

    if (allowAttachments && message.attachments.size > 0) return;
    if (allowEmbedded && message.embeds.length > 0) return;

    console.log(`Message with no media was caught in channel ${message.channelId}`);

    message.delete()
    .then(console.log("Message deleted succesfully."))
    .catch(console.error);;
});

// Load all command files
function loadCommands(foldersPath, commandFolders) {
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
