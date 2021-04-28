const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'mod', ['yasakla']);
  }

  run(client, message, args) {
    if(!message.member.permissions.has('BAN_MEMBERS')){
      message.channel.send('Bunun için yeterli yetkin yok');
    }else if(!message.guild.me.permissions.has('BAN_MEMBERS')){
      message.channel.send('Bunun için sunucuda yetkim yok.')
    }else{
      
      const banlanacak =  message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(banlanacak){
        if(banlanacak.id === message.author.id) return message.channel.send('Kendini banlayamazsın xd')
        if(banlanacak.id === message.guild.me.id) return message.channel.send('Püüü nası beni banlarsın');
        if(!banlanacak.bannable) return message.channel.send('Bu kullanıcı banlanamaz'); 
        if(banlanacak.permissions.has('ADMINISTRATOR')) return message.channel.send('bu kullanıcı banlanamaz');
        
        let reason = args.slice(1).join(" ");
        if(!reason) reason = "Neden belirtilmedi";
      banlanacak.ban({reason: reason}).catch(error => {
         message.channel.send('Bir şeyler ters gitti')
          console.log(error)
       })
   
        message.channel.send(`${banlanacak}, ${message.author} tarafından banlandı`)
       
      }else{
        message.channel.send('birini etiketle');
        
      }
    }
  }
}