require('dotenv').config();  // Lädt die Umgebungsvariablen aus der .env-Datei

const mineflayer = require('mineflayer');

// Erstelle den Bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'donutsmp.net',       // Minecraft Server Hostname
    port: 19132,                // Port des Servers (für Bedrock)
    username: process.env.MC_USERNAME,  // Minecraft-Username aus der .env-Datei
    password: process.env.MC_PASSWORD,  // Minecraft-Passwort aus der .env-Datei
    auth: 'mojang'              // Für Premium Accounts
  });

  bot.on('spawn', () => {
    console.log('✅ Bot ist online!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10000); // Alle 10 Sekunden
  });

  bot.on('error', (err) => {
    console.log('❌ Fehler aufgetreten:', err);
    bot.quit();
    setTimeout(createBot, 5000);
  });

  bot.on('end', () => {
    console.log('❌ Verbindung zum Server verloren!');
    setTimeout(createBot, 5000);
  });
}

createBot();

