const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Informuje o opóźnieniach bot`a.')
        .addBooleanOption(option =>
            option.setName('roundtrip')
                .setDescription('Jeśli `true` informuje o czasie przetwarzania komendy.')
                .setRequired(false)),
    async execute(interaction) {
        if (interaction.options.getBoolean('roundtrip', false)) {
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        }
        else
            await interaction.reply({ content: `Websocket heartbeat: ${interaction.client.ws.ping}ms.`, ephmeral: true });
    },
};