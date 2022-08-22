const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current')
        .setDescription('Показывает текущую погоду.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('Укажите город.')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const city = interaction.options.getString('city');
        interaction.reply(city);
    },
};