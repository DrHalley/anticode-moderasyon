const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb');
const Discord = require('discord.js');
module.exports = class JailCommand extends BaseCommand {
  constructor() {
    super('jail', 'jail', []);
  }

  run(client, message, args) {

    var admin = db.get(`jail_yetkili_rol.${message.guild.id}`);
    var rol = db.get(`jail_ceza_rol.${message.guild.id}`);
    var log = db.get(`jail_log.${message.guild.id}`);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    var jailAdmin = message.guild.roles.cache.get(admin);
    var jailCeza = message.guild.roles.cache.get(rol);
    var jailLog = message.guild.channels.cache.get(log);

    if(jailAdmin && jailCeza && jailLog){
      if(member){
        if(!message.member.roles.cache.some(m => m === jailAdmin)) return message.channel.send('Jail yetkili rolüne sahip değilsiniz');
        if(member.roles.cache.some(m => m === jailCeza)) return message.channel.send('Bu kullanıcı zaten jailde');
        if(member === message.member) return message.channel.send('Bruh kendini jailleyemezsin');
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Neden belirtilmedi";
        try{
          
          member.roles.cache.forEach(function(a){
            member.roles.remove(a)
          });
          member.roles.add(jailCeza)
          const embed = new Discord.MessageEmbed()
          .setTitle('Jail Sistemi')
          .addFields(
            {name: "Yetkili:", value: message.author, inline: true},
            {name: "Ceza alan kişi:", value: member, inline: true},
            {name: "Neden:", value: reason, inline: true},
          )
          jailLog.send(embed)

        }catch(error){
          console.log(error)
          message.channel.send('Bir hata meydana geldi. Lütfen rol sırasını kontrol edin');
        }
      }else{
        message.channel.send('bir kişi etiketle')
      }

    }else if(!jailAdmin || !jailCeza || !jailLog){
      message.channel.send('Ayarlamalar yapılmamış! Lütfen ceza rolü, yetkili rolü ve log kanalını ayarladığınıza emin olun');
    }else{
      message.channel.send('bir hata meydana geldi')
    }
    
  }
}