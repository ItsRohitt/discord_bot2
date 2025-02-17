require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const express = require('express');
const https = require('https');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot telah login sebagai ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    const args = message.content.split(" ");
    const command = args.shift().toLowerCase();

    // 📌 Perintah !ping
    if (command === '!ping') {
        message.reply('🏓 Pong!');
    }

    // 📌 Perintah !hello
    if (command === 'r!hello') {
        message.reply(`👋 Hawooooo, ${message.author.username}!`);
    }

    // 📌 Perintah !info
    if (command === 'r!info') {
        message.reply(`ℹ️ Server: ${message.guild.name} | Anggota: ${message.guild.memberCount}`);
    }

    // 📌 Perintah !kick @user
    if (command === 'r!kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply("❌ Kamu tidak punya izin untuk mengeluarkan anggota.");
        }

        const targetUser = message.mentions.members.first();
        if (!targetUser) {
            return message.reply("❌ Harap tag pengguna yang ingin dikeluarkan.");
        }

        try {
            await targetUser.kick();
            message.channel.send(`✅ ${targetUser.user.username} telah dikeluarkan dari server.`);
        } catch (error) {
            message.reply("❌ Gagal mengeluarkan anggota.");
            console.error(error);
        }
    }

    // 📌 Perintah !owner
    if (command === 'r!owner') {
        message.reply("RHT GANTENK 😎");
    }

    // 📌 Perintah !help
    if (command === 'r!help') {
        message.reply(
            "**📜 Daftar Perintah Bot:**\n" +
            "`!ping` - Mengecek respons bot\n" +
            "`r!hello` - Menyapa bot\n" +
            "`r!info` - Menampilkan info server\n" +
            "`r!kick @user` - Mengeluarkan pengguna (butuh izin)\n" +
            "`r!owner` - Menampilkan pesan spesial 😎\n" +
            "`r!help` - Menampilkan daftar perintah"
        );
    }
});

// 🔑 LOGIN BOT
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
    console.log(`🌐 Web server berjalan di https://localhost:${PORT}`);
});
