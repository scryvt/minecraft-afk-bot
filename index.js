const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'donutsmp.net',   // Minecraft Server Hostname
    port: 19132,            // Port des Servers (für Bedrock)
    username: 'misxhaa',    // Dein Minecraft-Username
    auth: 'mojang'          // Für Premium Accounts
  })

  bot.on('spawn', () => {
    console.log('✅ Bot ist online!')
    // Der Bot wird in regelmäßigen Abständen springen
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 10000) // Alle 10 Sekunden
  })

  // Fehlerbehandlung
  bot.on('error', (err) => {
    console.log('❌ Fehler aufgetreten:', err)
    bot.quit() // Wenn ein Fehler auftritt, stoppe den Bot
    setTimeout(createBot, 5000) // Versuche, den Bot nach 5 Sekunden neu zu starten
  })

  bot.on('end', () => {
    console.log('❌ Verbindung zum Server verloren!')
    setTimeout(createBot, 5000) // Versuche, den Bot nach 5 Sekunden neu zu verbinden
  })
}

// Starte den Bot
createBot()

