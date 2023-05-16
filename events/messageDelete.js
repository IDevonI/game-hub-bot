const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    async execute(message) {
        if (message.channelId === process.env.LOG_CHANNEL_ID) return;
        const embed = new EmbedBuilder()
            .setColor('#fa5c5c')
            .setTitle(message.author.tag)
            .setThumbnail("https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".jpeg")
            .setDescription(`ID Użytkownika: ${message.author.id}\nID Wiadomości: ${message.id}\nKanał: ${message.channel}`)
            .addFields(
                { name: 'Treść', value: message.cleanContent || '*Brak treści!*' }
            )
            .setTimestamp(message.createdTimestamp)
        await message.client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({
            content: message.attachments.size ? "Załączniki:" : null,
            embeds: [embed].concat(message.embeds),
            files: Array.from(message.attachments, ([key, value]) => value)
        });
    }
};