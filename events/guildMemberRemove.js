const { Events, EmbedBuilder } = require('discord.js');
const { setStats } = require('../utils');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        if (member.user.bot) {
            const embed = new EmbedBuilder()
                .setColor('#f71622')
                .setTitle(`Bot ${member.user.tag} nie sprawował się za dobrze!`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".jpeg")
                .setImage('https://media2.giphy.com/media/4no7ul3pa571e/giphy.gif?cid=ecf05e47ak4t0yxcj1g4z8nq6i5pqrmudkvupiqeolipof86&rid=giphy.gif&ct=g')
                .setTimestamp(Date.now())
            await member.client.channels.cache.get(process.env.CENSUS_CHANNEL_ID).send({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#f71622')
                .setTitle(`${member} niestety nas opuścił!`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".jpeg")
                .setImage('https://media.giphy.com/media/6dbpETScuiCvm/giphy.gif')
                .setTimestamp(Date.now())
            await member.client.channels.cache.get(process.env.CENSUS_CHANNEL_ID).send({ embeds: [embed] });
            setStats(member.client);
        }
    }
};