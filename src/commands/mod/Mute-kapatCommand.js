const db = require('croxydb');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MutekapatCommand extends BaseCommand {
  constructor() {
    super('mute-kapat', 'mod', []);
  }

  run(client, message, args) {
    var mute_log = db.get(`mute_log.${message.guild.id}`);
    var mute_ceza_rol = db.get(`mute_ceza_rol.${message.guild.id}`);
    var mute_yetkili_rol = db.get(`mute_yetkili_rol.${message.guild.id}`)
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `YÖNETİCİ` yetkisi vermelisiniz');
    }else{
      if(mute_log || mute_ceza_rol || mute_yetkili_rol){
      db.delete(`mute_log.${message.guild.id}`);
      db.delete(`mute_ceza_rol.${message.guild.id}`);
      db.delete(`mute_yetkili_rol.${message.guild.id}`);
      message.channel.send('Mute sistemi başarıyla kapatıldı');
    }else if(!mute_log && !mute_ceza_rol && !mute_yetkili_rol){
      message.channel.send('BU özellik zaten kapalıymış');
    }
    }
  }
}