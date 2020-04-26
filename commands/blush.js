const request = require("request");
const e621 = require("../e621.js");
const Int = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  Message.channel.startTyping();
  e621(false, ["rating:safe", "solo", "blush", "high_res", "score:>100"]).then(image => {
    Message.reply(Message.author.username + " **blushes**", {
      files: [image.file]
    }).catch(error => {
      Message.reply(Message.author.username + " **blushes**\n" + image.file);
      Message.channel.stopTyping();
    }).then(() => {
      Message.channel.stopTyping();
    });
  })
  .catch(error => {
    Message.channel.send("Error ocurred: ```\n" + error + "\n```");
  });
}