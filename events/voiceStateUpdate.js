const { Events, EmbedBuilder } = require('discord.js');

const mapVoiceState = (state) => {

}

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        
        const embed = new EmbedBuilder()
            .setColor('#48e6f7')
            .setTitle(newState.member.user.tag)
            .setThumbnail("https://cdn.discordapp.com/avatars/" + newState.member.id + "/" + newState.member.user.avatar + ".jpeg")
            .setDescription(`ID Użytkownika: ${newState.member.id}\n`)
            .addFields(
                { name: 'Stary stan:', value: JSON.stringify(oldState)},
                { name: ' ', value: '\u200B' },
                { name: 'Nowy stan:', value: JSON.stringify(newState) }
            )
            .setTimestamp(Date.now())
        await newState.client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({ embeds: [embed], });
    }
};