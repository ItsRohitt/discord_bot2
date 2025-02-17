require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

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
            "`r!hello` - Menyapa bot\n" +
            "`r!info` - Menampilkan info server\n" +
            "`r!kick @user` - Mengeluarkan pengguna (b
