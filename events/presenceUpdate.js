const { Events } = require('discord.js');
const { getTimestamp, setStats } = require('../utils');

module.exports = {
    name: Events.PresenceUpdate,
    execute(oldPresence, newPresence) {
        setStats(newPresence.client);
    },
};