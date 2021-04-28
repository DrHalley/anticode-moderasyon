const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('croxydb');
module.exports = class OtorolCommand extends BaseCommand {
  constructor() {
    super('otorol', 'karsilama', []);
  }

  async run(client, message, args) {
    if(!message.member.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkin yok')
    }else if(!message.guild.me.permissions.has('ADMINISTRATOR')){
      message.channel.send('Bunun için yeterli yetkim yok. Bu komutu kullanmanız için bana `YÖNETİCİ` yetkisi vermelisiniz');
    }else{

      var role = message.mentions.roles.first();
      if(role || args[0]){

        if(args[0] === "kapat"){

          if(!db.get(`otorol.${message.guild.id}`)){

            message.channel.send('BU özellik zaten kapalıymış')
          }else{

          db.delete(`otorol.${message.guild.id}`)
          message.channel.send('Otorol özelliği başarıyla kapatıldı')
          }
        }else if(role){

      if(role.position < message.guild.me.roles.highest.position){
      db.set(`otorol.${message.guild.id}`, role.id);
     message.channel.send(`Otorol başarıyla ${role} olarak ayarlandı`);
    }else{
      message.channel.send('Lütfen rol sırasını kontrol edin')
    }
   
    
        }else{
          message.channel.send('Bir rol etiketlemelisin ya da !otorol kapat yazmalısın')
        }
      }else if(!role && !args[0]){
        message.channel.send('Bir rol etiketlemelisin ya da !otorol kapat yazmalısın')
      }
    }
  }
}