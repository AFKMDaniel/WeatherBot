const { EmbedBuilder } = require('discord.js');

const getTemperature = (temp) => {
    return temp > 0 ? `+${Math.floor(temp)}°C` : `${Math.floor(temp)}°C`;
};

const getFirstLetterCapital = (string) => {
    const firstLetter = string.slice(0, 1);
    const result = string.replace(firstLetter, firstLetter.toUpperCase());

    return result;
};

const createCurrentEmbed = (data) => {

    const embed = new EmbedBuilder()
        .setColor([210, 105, 30])
        .setTitle(`${data.name}, ${data.sys.country}`)
        .setDescription(getTemperature(data.main.temp))
        .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        .addFields(
            { name: getFirstLetterCapital(data.weather[0].description), value: `Ощущается как ${getTemperature(data.main.feels_like)}` },
            { name: 'Ветер:', value: `${data.wind.speed} м/с`, inline: true },
            { name: 'Влажность:', value: `${data.main.humidity}%`, inline: true },
            { name: 'Атмосферное давление:', value: `${Math.floor(data.main.pressure / 1.333)} мм рт. ст.`, inline: true },
        );

        return embed;
};


module.exports = createCurrentEmbed;