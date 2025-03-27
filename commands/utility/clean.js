const { SlashCommandBuilder } = require("discord.js");
const { getMonitoredChannels } = require('../../channels.js');
const messages = require('../../messages.js')

let tempResponse;

module.exports = {
    data : new SlashCommandBuilder()
            .setName('clean')
            .setDescription("Deletes all messages in the server that don't match channel policy."),
            async execute(interaction) {
                try {
                    if (getMonitoredChannels().has(interaction.channel) == false)
                        await interaction.reply(messages.notMediaChannelMessage);
                    else {
                        tempResponse = messages.tidyingMessage;
                        await interaction.reply(tempResponse);
                        await cleanChannel(interaction, getMonitoredChannels().get(interaction.channel));
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

async function cleanChannel(interaction, context) {
    console.log("Cleaning context: ", context);
    const channel = interaction.channel;

    const msgs = await channel.messages.fetch();
    const toDelete = msgs.filter(msg => {return isRelevantForDeletion(msg, context["allowAttachments"], context["allowEmbedded"])});

    console.log(`Going to delete ${toDelete.size} messages.`);

    for (const msg of toDelete.values()) {
        console.log(`Deleting ${msg}`);
        await msg.delete().catch((err) => {
            console.error('Error deleting message:', err);
        });
    }
}

function isRelevantForDeletion(msg, allowAttachments, allowEmbedded) {
    let isRelevant = false;

    if (allowAttachments && allowEmbedded)
        isRelevant = msg.attachments.size === 0 && msg.embeds.length === 0;
    else if (allowAttachments)
        isRelevant = msg.attachments.size === 0;
    else if (allowEmbedded)
        isRelevant = msg.embeds.length === 0;

    return isRelevant && msg.content != tempResponse;
}
