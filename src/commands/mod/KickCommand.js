const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'mod', ['at']);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('KICK_MEMBERS')){
      message.channel.send('Bunun için yeterli yetkin yok');
    }else if(!message.guild.me.permissions.has('KICK_MEMBERS')){
      message.channel.send('Bunun için sunucuda yetkim yok.')
    }else{
      const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(member){
        if(!member.kickable) return message.channel.send('bu kişi sunucudan atılamaz');
      if(!member.permissions.has('ADMINISTRATOR')) return message.channel.send('bu kişi sunucudan atılamaz');

      let reason = args.slice(1).join(" ");
        if(!reason) reason = "Neden belirtilmedi";
      banlanacak.kick({reason: reason}).catch(error => {
         message.channel.send('Bir şeyler ters gitti')
          console.log(error)
       })
      }else if(!member){
        message.channel.send('birini etiketle');
      }else{
        message.channel.send('beklenmedik bir hata oldu')
      }
      
      
    }
  }
}