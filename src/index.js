const Discord = require('discord.js')
const { Client, Message, MessageAttachment } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const db = require('croxydb');
(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
})();


client.on('message', async message => {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  var kufurliste = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "sg", "s.ktir"];
  var kufur = db.get(`kufur_engel.${message.guild.id}`)
  if(kufur === true){
    if(kufurliste.some(m => message.content.toLocaleLowerCase().includes(m))){
      message.delete();
      const embed = new Discord.MessageEmbed()
      .setDescription(`${message.author} cık cık küfür çok ayıp`);
      message.channel.send(embed)
    }
  }else if(!kufur || kufur === false) return;
}else {
  return;
}
})

client.on('message', async message => {
  if(!message.member.permissions.has('BAN_MEMBERS')){
  var linkliste = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];
  var link = db.get(`link_engel.${message.guild.id}`)
  if(link === true){
    if(linkliste.some(m => message.content.toLocaleLowerCase().includes(m))){
      message.delete();
      const embed = new Discord.MessageEmbed()
      .setDescription(`${message.author} cık cık reklam çok ayıp`);
      (await message.channel.send(embed)).delete({timeout: 15000})
    }
  }else if(!link || link === false) return;
}else {
  return;
}
})

client.on('messageUpdate', async (oldMessage, newMessage)=> {
  if(!newMessage.member.permissions.has('BAN_MEMBERS')){
    var kufurliste = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", "sg", "s.ktir"];
    var kufur = db.get(`kufur_engel.${newMessage.guild.id}`)
    if(kufur === true){
      if(kufurliste.some(m => newMessage.content.toLocaleLowerCase().includes(m))){
        newMessage.delete();
        const embed = new Discord.MessageEmbed()
        .setDescription(`${newMessage.author} cık cık küfür çok ayıp`);
        newMessage.channel.send(embed)
      }
    }else if(!kufur || kufur === false) return;
  }else {
    return;
  }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if(!newMessage.member.permissions.has('BAN_MEMBERS')){
    var linkliste = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];
    var link = db.get(`link_engel.${newMessage.guild.id}`)
    if(link === true){
      if(linkliste.some(m => newMessage.content.toLocaleLowerCase().includes(m))){
        newMessage.delete();
        const embed = new Discord.MessageEmbed()
        .setDescription(`${newMessage.author} cık cık reklam çok ayıp`);
        (await newMessage.channel.send(embed)).delete({timeout: 15000})
      }
    }else if(!link || link === false) return;
  }else {
    return;
  }
})
