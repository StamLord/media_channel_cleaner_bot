const { SlashCommandBuilder } = require("discord.js");
const { getMonitoredChannels } = require('../../channels.js');
const messages = require('../../messages.js');

module.exports = {
    data : new SlashCommandBuilder()
            .setName('is-media-channel')
            .setDescription("Checks if current channel is configures as a media-only channel."),
            async execute(interaction) {
                try {
                    if (getMonitoredChannels().has(interaction.channel) == false)
                        await interaction.reply(messages.notMediaChannelMessage);
                    else
                        await interaction.reply(messages.isMediaChannelMessage);
                } catch (error) {
                    console.error('Error replying:', error);
                    await interaction.reply(messages.generalError);
                }
            },
        };
