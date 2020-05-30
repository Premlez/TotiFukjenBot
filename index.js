require('dotenv').config();

const { KlasaClient } = require('klasa');

const client = new KlasaClient({ 
    commands: {
        prefix: '$'
    },
	fetchAllMembers: false,
	//prefix: '$',
	commandEditing: true,
	typing: true,
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
});

client.token = process.env.TOKEN;
client.connect();