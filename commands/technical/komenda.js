const { SlashCommandBuilder } = require('discord.js');
const { getTimestamp } = require('../../utils');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('komenda')
        .setDescription('Zarządzanie komendami na serwerze.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('odswiez')
                .setDescription('Przeładowuje komendę.')
                .addStringOption(option =>
                    option.setName('rodzaj')
                        .setDescription('Rodzaj komendy do przeładowania.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'moderation', value: 'moderation' },
                            { name: 'technical', value: 'technical' },
                            { name: 'users', value: 'users' }
                        ))
                .addStringOption(option =>
                    option.setName('nazwa')
                        .setDescription('Nazwa komendy do przeładowania.')
                        .setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('usun')
                .setDescription('Usuwa komendę z serwera.')
                .addIntegerOption(option =>
                    option.setName('identyfikator')
                        .setDescription('ID komendy do usunięcia.')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'odswiez') {
            const commandName = interaction.options.getString('nazwa', true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply({ content: `Nie odnaleziono komendy \`${commandName}\`!`, ephmeral: true });
            }

            delete require.cache[require.resolve(`../${interaction.options.getString('rodzaj', true).toLowerCase()}/${command.data.name}.js`)];

            try {
                interaction.client.commands.delete(command.data.name);
                const newCommand = require(`../${interaction.options.getString('rodzaj', true).toLowerCase()}/${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                await interaction.reply({ content: `Komenda \`${newCommand.data.name}\` została przeładowana!`, ephmeral: true });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Podczas przeładowywania komendy wystąpił błąd! \`${command.data.name}\`:\n\`${error.message}\``, ephmeral: true });
            }

        } else {
            rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, interaction.options.getInteger('identyfikator',true)))
                .then(async () => { 
                    console.log(getTimestamp(), 'Successfully deleted guild command'); 
                    await interaction.reply({ content: `Pomyślnie usunięto komendę.`, ephmeral: true }); 
                })
                .catch(async (reason) => {
                    console.error(reason);
                    await interaction.reply({ content: `Podczas usuwania komendy wystąpił błąd! \n\`${reason}\``, ephmeral: true });
                });
        }
    },
};