const { SlashCommandBuilder } = require("discord.js");
const { getMonitoredChannels, addChannel } = require('../../channels.js');
const messages = require('../../messages.js')

module.exports = {
    data : new SlashCommandBuilder()
            .setName('add-media-channel')
            .setDescription("Adds this channel to the media channels being monitored."),
            async execute(interaction) {
                try {
                    if (getMonitoredChannels().has(interaction.channel))
                        await interaction.reply(messages.alreadyMediaChannelMessage);
                    else {
                        await addChannel(interaction.channel);
                        await interaction.reply(messages.addedChannelMessage);
                    }
                } catch (error) {
                    console.error('Error replying:', error);
                    await interaction.reply(messages.generalError);
                }
            },
        };
