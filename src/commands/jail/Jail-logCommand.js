const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb')
module.exports = class JaillogCommand extends BaseCommand {
  constructor() {
    super('jail-log', 'jail', []);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `YÖNETİCİ` yetkisi vermelisiniz');
    }else{
      const channel = message.mentions.channels.first() || message.guild.channels.get(args[0])
      if(!channel) return message.channel.send('Bir kanal etiketle!');
      if(channel){
        db.set(`jail_log.${message.guild.id}`, channel.id)
        message.channel.send(`Jail-Log başarıyla ${channel} ayarlandı`)
      }
    }
  }
}