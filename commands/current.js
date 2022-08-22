const { SlashCommandBuilder } = require('discord.js');
const createCurrentEmbed = require('../embeds/current-embed');
const Service = require('../services/service');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current')
        .setDescription('Показывает текущую погоду.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('Укажите населенный пункт.')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const city = interaction.options.getString('city');
        await interaction.deferReply();
        try {
            const result = await Service.GetCurrentWeather(city);
            const embed = createCurrentEmbed(result.data);
            interaction.editReply({ embeds: [embed] });
        }
        catch (error) {
            if (error.message === 'Request path contains unescaped characters') {
                interaction.editReply(':exclamation: Введите название населенного пункта на английском языке');
                return;
            }
            interaction.editReply(`:exclamation: ${error.message}`);
        }
    },
};