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

// Event saat ada pesan dikirim
client.on('messageCreate', async message => {
    if (message.author.bot) return; // Jangan respon pesan dari bot

    const args = message.content.split(" ");
    const command = args.shift().toLowerCase();

    // Perintah !ping
    if (command === 'r!ping') {
        message.reply('🏓 Pong!');
    }

    // Perintah !hello
    if (command === 'r!hello') {
        message.reply(`👋 Hawooooo, ${message.author.username}!`);
    }

    // Perintah !info
    if (command === 'r!info') {
        message.reply(`ℹ️ Server: ${message.guild.name} | Anggota: ${message.guild.memberCount}`);
    }

    // Perintah !kick @user
    if (command === 'r!kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply("❌ Kamu tidak punya izin untuk mengeluarkan anggota.");
        }

        let member = message.mentions.members.first();
        if (!member) return message.reply("⚠️ Sebutkan anggota yang ingin dikeluarkan.");
        
        try {
            await member.kick();
            message.reply(`✅ ${member.user.tag} telah dikeluarkan.`);
        } catch (error) {
            message.reply("❌ Gagal mengeluarkan anggota.");
            console.error(error);
        }
    }

    // Perintah !ban @user
    if (command === 'r!ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply("❌ Kamu tidak punya izin untuk memblokir anggota.");
        }

        let member = message.mentions.members.first();
        if (!member) return message.reply("⚠️ Sebutkan anggota yang ingin diblokir.");
        
        try {
            await member.ban();
            message.reply(`✅ ${member.user.tag} telah diblokir.`);
        } catch (error) {
            message.reply("❌ Gagal memblokir anggota.");
            console.error(error);
        }
    }
});

// Login ke bot
client.login(process.env.TOKEN);
