const { Events } = require('discord.js');
const { getTimestamp } = require('../utils');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(getTimestamp(), `Logged in as ${client.user.tag}`);
		let msgCount = 0;
		let idx = 0;
		client.channels.cache.forEach(
			channel => {
				if (channel.isTextBased() && channel.id !== process.env.LOG_CHANNEL_ID)
					channel.messages.fetch().then((m => {
						idx++;
						msgCount += m.size
						if (client.channels.cache.size === idx)
							console.log(getTimestamp(), `Messages fetched: ${msgCount}`)
					}))
				else {
					idx++;
					if (client.channels.cache.size === idx)
						console.log(getTimestamp(), `Messages fetched: ${msgCount}`)
				}
			})
	},
};