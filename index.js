require('dotenv').config();

const { KlasaClient } = require('klasa');

const client = new KlasaClient({ 
    commands: {
        prefix: '$'
	},
	//permissionLevels: (t) => t.add(0, ({ author, client }) => client.owners.has(author)).add(10, ({ author, client }) => client.owners.has(author)), //Odgovarja samo ownerju (meni)
	fetchAllMembers: false,
	//prefix: '$',
	commandEditing: true,
	typing: true,
	readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
});

client.token = process.env.TOKEN;
client.connect();