const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb');
const Discord = require('discord.js');
const ms = require('ms')
module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'mod', []);
  }

  async run(client, message, args) {
    var admin = db.get(`mute_yetkili_rol.${message.guild.id}`);
    var channel = await db.fetch(`mute_log.${message.guild.id}`);
    var rolea = await db.fetch(`mute_ceza_rol.${message.guild.id}`);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    var muteAdmin = message.guild.roles.cache.get(admin);
    var muteLog = message.guild.channels.cache.get(channel);
    var muteRole = message.guild.roles.cache.get(rolea);
    
   

    if(muteAdmin && muteLog && muteRole){

    if(message.member.roles.cache.some(role => role === muteAdmin)){
    if(!member){
      message.channel.send('Lütfen bir kişi etiketle');
    }else if(!args[1]){
      message.channel.send('Lütfen bir süre gir(İngilizce saatler). Örn: !mute @kişi 15m sebep');
    }else if(args[1] && member){
      let reason = args.slice(2).join(" ");
      if(!reason) reason = "Neden belirtilmedi";
      let time = ms(args[1]
        .replace('saniye', 's')
        .replace('sn', 's')
        .replace('dakika', 'm')
        .replace('dk', 'm')
        .replace('saat', 'h')
        .replace('sa', 'h')
        .replace('gün', 'd')
        .replace('g', 'd')
        )
       
      
    if (time > 1209600000) return message.channel.send('Lütfen 14 günden az bir süre giriniz')

    if(member.roles.cache.some(role => role === muteRole)) return message.channel.send('Bu kullanıcı zaten susturulmuş');

    try{
      
      
      const embed = new Discord.MessageEmbed()
      .setTitle('Susturulma işlemi')
      .addFields(
        {name: "Yetkili:", value: message.author, inline: true},
        {name: "Susturulan Kişi:", value: member, inline: true},
        {name: "Susturulma sebebi", value: reason, inline: true},
        {name: "Susturulma süresi:", value: args[1] , inline: true}

      )
      muteLog.send(embed);
      member.roles.add(muteRole);
    }catch(error){
      console.log(error);
      message.channel.send('Lütfen rol sırasını kontrol edin');
    }

    setTimeout(function(){
      const mutebitti = new Discord.MessageEmbed()
      .setTitle('Susturulma Bitti')
      .setDescription(`${member} adlı kişinin susturulması bitti`)
      member.roles.remove(muteRole);
      muteLog.send(mutebitti)
    }, time)

    }

    }else if(!message.member.roles.cache.some(role => role === muteRole)){
      message.channel.send('Mute yetkili rolüne sahip değilsiniz');
    }else{
      message.channel.send('bir hata oldu')
    }
  }else{
    message.channel.send('Ayarlamalar yapılmamış! Lütfen ceza rolü, yetkili rolü ve log kanalını ayarladığınıza emin olun');
  }
    
  }
}