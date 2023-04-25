console.clear()
process.title = "Thanks to high#1337 <3"
const fs = require("fs")
const settings = {
    token: "",
    guildID: ""
}

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
	checkUpdate: false
});

client.on('ready', async () => {
  console.log(`Welcome to High Parser\n${client.user.username}#${client.user.discriminator}`)
  const guild = client.guilds.cache.get(settings.guildID)
  if (!guild) return console.log(`Server ID is incorrect.`)
  console.log(`Now, I'm checking the ${guild.name} server.`)
  let high = 'Thanks to high#1337\n';
  guild.members.fetch().then(members => {
    members.each(member => {
      const badges = member.user.flags.toArray();
      if (!badges.toString()) return;
      if (badges.toString().includes("HOUSE_BRAVERY")) return;
      if (badges.toString().includes("HOUSE_BALANCE")) return;
      if (badges.toString().includes("HOUSE_BRILLIANCE")) return;
      if (badges.toString().includes("VERIFIED_BOT")) return;
      high += `${member.user.username}#${member.user.discriminator} (${member.user.id}): ${badges.join(', ')}\n`
    });
    fs.writeFile("result.txt", high, (err) => {
        if (err) return console.log(err)
        console.log("Done.")
      })
  });
  
})

client.login(settings.token);
