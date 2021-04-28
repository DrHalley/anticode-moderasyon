const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb');
module.exports = class LinkengelCommand extends BaseCommand {
  constructor() {
    super('link-engel', 'mod', []);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `Mesajları Yönet` yetkisi vermelisiniz');
    }else{
      var cevap = args[0];
      if(cevap === "aç"){
       if(db.get(`link_engel.${message.guild.id}`) === false || !db.get(`link_engel.${message.guild.id}`)){
        db.set(`link_engel.${message.guild.id}`, true)
        message.channel.send('Link Engel özelliği başarıyla açıldı.')
       }else{
         message.channel.send('Bu özellik zaten açıkmış :D?')
       }
      }else if(cevap === "kapat"){
        if(db.get(`link_engel.${message.guild.id}`) === true){
        db.delete(`link_engel.${message.guild.id}`)
          message.channel.send('Link Engel özelliği başarıyla kapatıldı')
         }else if(db.get(`link_engel.${message.guild.id}`) === false || !db.get(`link_engel.${message.guild.id}`)){
          message.channel.send('Bu özellik zaten kapalıymış :D?')
         }
      }
    }
  }
}