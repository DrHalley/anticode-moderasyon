// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const db = require('croxydb');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    var rol = db.get(`otorol.${member.guild.id}`);
    var role = member.guild.roles.cache.get(rol);
    try{
      if(role){
      member.roles.add(role)
    }else{
      return
    }
  }catch(err){
    db.delete(`otorol.${member.guild.id}`);
    member.guild.owner.user.send(`${member.guild.name} sunucusunda rolüm <@${role}> rolünden daha alçakta olduğu için rol veremiyorum. Lütfen ayarlamaları yapınız`);
  }
    
  }

  async run(client, member){
    
  }
}