const { Events, EmbedBuilder } = require('discord.js');

const mapVoiceState = (oldState, newState) => {
    let fields = [];
    if (newState.channel !== null) {
        fields.push({ name: 'Kanał: ', value: `${newState.channel}` });
        if (oldState.selfMute === newState.selfMute && oldState.serverMute === newState.serverMute)
            fields.push({ name: 'Mikrofon: ', value: newState.serverMute ? 'Wyłączony przez moderację' : newState.selfMute ? 'Wyłączony' : 'Włączony' });
        else
            fields.push({ name: 'Mikrofon: ', value: `${oldState.serverMute ? 'Wyłączony przez moderację' : oldState.selfMute ? 'Wyłączony' : 'Włączony'} -> ${newState.serverMute ? 'Wyłączony przez moderację' : newState.selfMute ? 'Wyłączony' : 'Włączony'}` });

        if (oldState.selfDeaf === newState.selfDeaf && oldState.serverDeaf === newState.serverDeaf)
            fields.push({ name: 'Dźwięk: ', value: newState.serverDeaf ? 'Wyłączony przez moderację' : newState.selfDeaf ? 'Wyłączony' : 'Włączony' });
        else
            fields.push({ name: 'Dźwięk: ', value: `${oldState.serverDeaf ? 'Wyłączony przez moderację' : oldState.selfDeaf ? 'Wyłączony' : 'Włączony'} -> ${newState.serverDeaf ? 'Wyłączony przez moderację' : newState.selfDeaf ? 'Wyłączony' : 'Włączony'}` });

        if (oldState.selfVideo === newState.selfVideo)
            fields.push({ name: 'Kamera: ', value: newState.selfVideo ? 'Włączona' : 'Wyłączona' });
        else
            fields.push({ name: 'Kamera: ', value: `${oldState.selfVideo ? 'Włączona' : 'Wyłączona'} -> ${newState.selfVideo ? 'Włączona' : 'Wyłączona'}` });

        if (oldState.streaming === newState.streaming)
            fields.push({ name: 'Stream: ', value: newState.streaming ? 'Włączony' : 'Wyłączony' });
        else
            fields.push({ name: 'Stream: ', value: `${oldState.streaming ? 'Włączony' : 'Wyłączony'} -> ${newState.streaming ? 'Włączony' : 'Wyłączony'}` });

    } else
        fields.push({ name: 'Kanał: ', value: oldState.channel ? `Opuścił  ${oldState.channel}` : `Dołączył do ${newState.channel}` });

    return fields;
}

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const embed = new EmbedBuilder()
            .setColor('#48e6f7')
            .setTitle(newState.member.user.tag)
            .setThumbnail('https://cdn.discordapp.com/avatars/' + newState.member.id + '/' + newState.member.user.avatar + '.jpeg')
            .setDescription(`ID Użytkownika: ${newState.member.id}\n`)
            .addFields(mapVoiceState(oldState, newState))
            .setTimestamp(Date.now())
        await newState.client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({ embeds: [embed], });
    }
};