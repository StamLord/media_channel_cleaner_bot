const { SlashCommandBuilder } = require("discord.js");
const { getMonitoredChannels, removeChannel } = require('../../channels.js');
const messages = require('../../messages.js')

module.exports = {
    data : new SlashCommandBuilder()
            .setName('remove-media-channel')
            .setDescription("Remove this channel from the media channels being monitored."),
            async execute(interaction) {
                try{
                    if (!getMonitoredChannels().has(interaction.channel))
                        await interaction.reply(messages.notMediaChannelMessage);
                    else {
                        await removeChannel(interaction.channel);
                        await interaction.reply(messages.removedChannelMessage);
                    }
                } catch (error) {
                    console.error('Error replying:', error);
                    await interaction.reply(messages.generalError);
                }
            },
        };
