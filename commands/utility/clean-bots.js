const { SlashCommandBuilder } = require("discord.js");
const { getMonitoredChannels } = require('../../channels.js');
const messages = require('../../messages.js')

let tempResponse;

module.exports = {
    data : new SlashCommandBuilder()
            .setName('clean-bots')
            .setDescription("Deletes all bot messages in the server."),
            async execute(interaction) {
                try {
                    if (getMonitoredChannels().has(interaction.channel) == false)
                        await interaction.reply(messages.notMediaChannelMessage);
                    else {
                        tempResponse = messages.tidyingMessage;
                        await interaction.reply(tempResponse);
                        await cleanChannelBotMessages(interaction);
                        await interaction.editReply(messages.doneCleaningMessage);
                        tempResponse = null;
                    }
                } catch (error) {
                    console.error('Error replying:', error);
                    if (interaction.replied)
                        await interaction.editReply(messages.generalError);
                    else
                        await interaction.reply(messages.generalError);
                }
            },
        };

async function cleanChannelBotMessages(interaction) {
    console.log("Cleaning bot messages");
    const channel = interaction.channel;

    const msgs = await channel.messages.fetch();
    const toDelete = msgs.filter(msg => {return msg.author.bot && msg.content != tempResponse});

    console.log(`Going to delete ${toDelete.size} messages.`);

    for (const msg of toDelete.values()) {
        console.log(`Deleting ${msg}`);
        await msg.delete().catch((err) => {
            console.error('Error deleting message:', err);
        });
    }
}
