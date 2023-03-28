const { Events } = require('discord.js');
const { getTimestamp } = require('../utils');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(getTimestamp(),`Ready! Logged in as ${client.user.tag}`);
	},
};