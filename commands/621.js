const request = require("request");
const e621 = require("../e621.js");
const Int = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const GetImgType = function(Message) {
  let Channel = Message.channel;
  switch (Channel.id) {
    case "691349756806692864":
      return "male/male";
    case "691349730118074480":
      return "male/female";
    case "691349676888424478":
      return "male/female";
    default:
      return "";
  }
}
module.exports = function(Message, Client, Args) {
  if (!Message.channel.nsfw && Message.channel.id !== "696175998194155591") {
    Message.channel.send("Lood dood, that command is for an NSFW channel x3");
    return;
  }
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  Message.channel.startTyping();
  Args.push(GetImgType(Message));
  e621(false, Args).then(image => {
    Message.reply("Score: " + image.score, {
      files: [image.file]
    }).catch(error => {
      Message.reply("Score: " + image.score + " " + image.file);
      Message.channel.stopTyping();
    }).then(() => {
      Message.channel.stopTyping();
    });
  })
  .catch(error => {
    Message.channel.send("Error ocurred: ```\n" + error + "\n```");
  });
}