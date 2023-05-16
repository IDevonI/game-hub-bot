const { Events } = require('discord.js');
const { setStats } = require('../utils');

module.exports = {
    name: Events.PresenceUpdate,
    execute(oldPresence, newPresence) {
        setStats(newPresence.client);
    },
};