const { Client, GatewayIntentBits, Collection, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const keepAlive = require('./server');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', () => {
    console.log('Ready!');
});

client.on('guildCreate', async (guild) => {
		try {
			await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), { body: commands });
			console.log('Success!');
		}
		catch (error) {
			console.error(error);
		}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.editReply(error.message);
	}
});

keepAlive();
client.login(process.env.DISCORD_TOKEN);

