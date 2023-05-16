const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    async execute(oldMessage, newMessage) {
        if (newMessage.channelId === process.env.LOG_CHANNEL_ID) return;
        const embed = new EmbedBuilder()
            .setColor('#ccf545')
            .setTitle(newMessage.author.tag)
            .setThumbnail("https://cdn.discordapp.com/avatars/" + newMessage.author.id + "/" + newMessage.author.avatar + ".jpeg")
            .setDescription(`ID Użytkownika: ${newMessage.author.id}\nID Wiadomości: ${newMessage.id}\nKanał: ${newMessage.channel}`)
            .addFields(
                { name: 'Stara treść:', value: oldMessage.cleanContent || '*Brak treści!*' },
                { name: ' ', value: '\u200B' },
                { name: 'Nowa treść:', value: newMessage.cleanContent || '*Brak treści!*' }
            )
            .setTimestamp(newMessage.createdTimestamp)
        await newMessage.client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({
            content: message.attachments.size ? "Załączniki:" : null,
            embeds: [embed].concat(oldMessage.embeds,newMessage.embeds),
            files: Array.from(newMessage.attachments, ([key, value]) => value)
        });
    }
};