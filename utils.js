const getTimestamp = () => {
    return '[' + (new Date).toLocaleString('pl-PL') + ']';
}

const setStats = (client) => {
    const members = client.guilds.resolve(process.env.GUILD_ID).members.cache;
    const players = members.filter(m => !m.user.bot);
    const bots = members.size - players.size
    const online = players.filter(m => !m.user.bot && m.presence?.status !== 'offline').size;
    client.channels.cache.get(process.env.STATS_PLAYERS_CHANNEL_ID).setName(`🌍Gracze: ${players.size}`)
    client.channels.cache.get(process.env.STATS_ONLINE_CHANNEL_ID).setName(`🟢 Online: ${online}`);
    client.channels.cache.get(process.env.STATS_OFFLINE_CHANNEL_ID).setName(`🔴Offline: ${players.size - online}`);
    client.channels.cache.get(process.env.STATS_BOTS_CHANNEL_ID).setName(`🤖Boty: ${bots}`);
}

module.exports = {
    getTimestamp,
    setStats
}