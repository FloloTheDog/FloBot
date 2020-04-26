/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
const seedrandom = require('seedrandom');
module.exports = function(Message, Arguments, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
    let Mentions = Message.mentions.users.array();
    //if (Mentions.length != 1) {
    //  Message.channel.send("Mention 1 person, silly!");
    //} else {
      let MentionedUser = Mentions[0] ? Mentions[0].id : Message.author.id;
      let RNG = seedrandom(MentionedUser);
      let PercentCute = MentionedUser == 605643702937059328 ? 100 : Math.floor(RNG() * 100);
      if (PercentCute <= 51) {
        PercentCute = 100 - PercentCute;
      }
      Message.channel.send("<@!" + MentionedUser + "> **is** `" + PercentCute + "%` **cute**");
    //}
}