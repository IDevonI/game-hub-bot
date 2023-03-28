const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { getTimestamp } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('zaladuj')
        .setDescription('Wysyła zbiór komend do serwera Discord.'),
    async execute(interaction) {
        const commands = [];

        const foldersPath = String(__dirname).split('\\technical')[0];
        console.log(foldersPath)
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../${folder}/${file}`);
                commands.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        (async () => {
            try {
                console.log(getTimestamp(), `Started refreshing ${commands.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    { body: commands },
                );

                console.log(getTimestamp(), `Successfully reloaded ${data.length} application (/) commands.`);
                await interaction.reply({ content: `Pomyślnie załadowano ${data.length} (/) komend.`, ephmeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Nie udało się załadować komend.`, ephmeral: true });
            }
        })();
    },
};