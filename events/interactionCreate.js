const { Events, Collection } = require('discord.js');
const { getTimestamp } = require('../utils');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(getTimestamp(), `Command ${interaction.commandName} does not exist.`);
            await interaction.reply({content: `Nie odnaleziono komendy \`${commandName}\`!`, ephmeral: true});
            return;
        }

        const { cooldowns } = interaction.client;

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 1;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Kolejne użycie dostępne <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Podczas wykonywania polecenia wystąpił błąd!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Podczas wykonywania polecenia wystąpił błąd!', ephemeral: true });
            }
        }
    }
};