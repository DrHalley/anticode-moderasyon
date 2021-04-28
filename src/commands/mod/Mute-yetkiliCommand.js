const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb')
module.exports = class MuteyetkiliCommand extends BaseCommand {
  constructor() {
    super('mute-yetkili', 'mod', []);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `YÖNETİCİ` yetkisi vermelisiniz');
    }else{
      const role = message.mentions.roles.first() || message.guild.channels.get(args[0]);
      if(!role) return message.channel.send('Bir rol etiketle');
      else if(role){
        message.channel.send(`Mute-Yetkili rolü başarıyla ${role} yapıldı`);
        db.set(`mute_yetkili_rol.${message.guild.id}`, role.id);
      }else{
        message.channel.send('bir hata oldu')
      }
    }
  }
}