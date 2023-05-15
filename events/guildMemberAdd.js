const { Events, EmbedBuilder } = require('discord.js');
const { setStats } = require('../utils');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (member.user.bot) {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(`Bot ${member} przybył aby usprawnić serwer!`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".jpeg")
                .setImage('https://media.giphy.com/media/CTX0ivSQbI78A/giphy.gif')
                .setTimestamp(Date.now())
            await member.client.channels.cache.get(process.env.CENSUS_CHANNEL_ID).send({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(`Witaj ${member}!`)
                .setThumbnail("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".jpeg")
                .addFields(
                    {
                        name: 'Pamiętaj!', value: `Zajrzyj na ${member.client.channels.cache.get(process.env.REGULATIONS_CHANNEL_ID)} oraz ${member.client.channels.cache.get(process.env.ROLES_CHANNEL_ID)}.
                 Dopóki nie zaakceptujesz regulaminu i nie przypiszesz sobie odpowiednich roli, częśc serwera będzie przed Tobą ukryta!` }
                )
                .setImage('https://media4.giphy.com/media/xTiIzJSKB4l7xTouE8/giphy.gif')
                .setTimestamp(Date.now());
            await member.client.channels.cache.get(process.env.CENSUS_CHANNEL_ID).send({ embeds: [embed] });
            setStats(member.client);
        }
    }
};