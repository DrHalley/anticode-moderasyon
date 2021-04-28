const db = require('croxydb');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KüfürengelCommand extends BaseCommand {
  constructor() {
    super('küfür-engel', 'mod', []);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `Mesajları Yönet` yetkisi vermelisiniz');
    }else{
      var cevap = args[0];
      if(cevap === "aç"){
       if(db.get(`kufur_engel.${message.guild.id}`) === false || !db.get(`link_engel.${message.guild.id}`)){
        db.set(`kufur_engel.${message.guild.id}`, true)
        message.channel.send('Küfür Engel özelliği başarıyla açıldı.')
       }else{
         message.channel.send('Bu özellik zaten açıkmış :D?')
       }
      }else if(cevap === "kapat"){
        if(db.get(`kufur_engel.${message.guild.id}`) === true){
        db.delete(`kufur_engel.${message.guild.id}`)
          message.channel.send('Küfür Engel özelliği başarıyla kapatıldı')
         }else if(db.get(`kufur_engel.${message.guild.id}`) === false || !db.get(`link_engel.${message.guild.id}`)){
          message.channel.send('Bu özellik zaten kapalıymış :D?')
         }
      }
    }
  }
}