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
      let RNG = seedrandom.xor4096(MentionedUser);
      let PercentCute = MentionedUser == 399955643731017729 ? 100 : Math.floor(RNG() * 100);
      if (PercentCute < 50) {
        PercentCute = 100 - (PercentCute - 10);
      }
      Message.channel.send("<@!" + MentionedUser + "> **is** `" + PercentCute + "%` **gay**");
    //}
}