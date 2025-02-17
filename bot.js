require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const https = require('https');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Bot telah login sebagai ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    
    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});

client.login(process.env.TOKEN);

// Web Server dengan HTTPS
const app = express();
const PORT = 3000;

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

https.createServer(options, app).listen(PORT, () => {
    console.log(`Web server berjalan di https://localhost:${PORT}`);
});