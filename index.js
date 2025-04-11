const mineflayer = require('mineflayer')
require('dotenv').config()  // Umgebungsvariablen laden

// Erstelle den Bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'donutsmp.net',       // Minecraft Server Hostname
    port: 19132,                // Port des Servers (für Bedrock)
    username: process.env.MC_USERNAME,  // Minecraft-Username aus Umgebungsvariablen
    password: process.env.MC_PASSWORD,  // Minecraft-Passwort (falls erforderlich)
    auth: 'mojang'              // Für Premium Accounts (du kannst 'mojang' oder 'microsoft' verwenden)
  })

  // Wenn der Bot erfolgreich spawnt (sich mit dem Server verbindet)
  bot.on('spawn', () => {
    console.log('✅ Bot ist online!')

    // Der Bot wird in regelmäßigen Abständen springen
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500) // 500ms springen
    }, 10000) // Alle 10 Sekunden

    // Der Bot könnte auch in regelmäßigen Abständen einen Block abbauen (optional)
    // setInterval(() => {
    //   // Hier könntest du den Bot auch andere Aktivitäten machen lassen
    // }, 15000) // Alle 15 Sekunden
  })

  // Fehlerbehandlung, wenn der Bot auf einen Fehler stößt
  bot.on('error', (err) => {
    console.log('❌ Fehler aufgetreten:', err)
    setTimeout(createBot, 5000) // Versuche, den Bot nach 5 Sekunden neu zu starten
  })

  // Wenn der Bot die Verbindung verliert
  bot.on('end', () => {
    console.log('❌ Verbindung zum Server verloren!')
    setTimeout(createBot, 5000) // Versuche, den Bot nach 5 Sekunden neu zu verbinden
  })
}

// Starte den Bot
createBot()


// Starte den Bot
createBot()

