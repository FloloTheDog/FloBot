const Action = "suck";
const IsNSFW = true;
const APIVer = "v1";
const axios = require("axios");
const fs = require("fs");
const e621 = require("../e621.js");
module.exports = function(Message, Client) {
  if (!Message.channel.nsfw) {
    Message.channel.send("Lood dood, that command is for an NSFW channel x3");
    return;
  }
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  let Mentions = Message.mentions.users.array();
  if (Mentions.length != 1) {
    Message.channel.send("Mention 1 person, silly!");
  } else {
    let MentionedUser = Mentions[0].id;
    let Pref = IsNSFW ? "nsfw" : "sfw";
    /*let Class = `furry/${Pref}/${Action}`;
    let Endpoint = `https://api.furry.bot/${APIVer}/${Class}/image`;
    Message.channel.send("<@!" + Message.author.id + "> **" + Action + "s** <@" + MentionedUser + ">", {
      files: [
        {
          attachment: Endpoint,
          name: "image.jpeg"
        }
      ]
    });*/
    Message.channel.startTyping();
    e621(false, ["order:random", "rating:explicit", Mentions.length == 0 ? "solo" : "-solo", "-animated", "fellatio", "male", "-young", "-3d", "-flash", "high_res", "score:>300"]).then(image => {
      let msg = Mentions.length == 0 ? Message.author.username : Message.author.username + " **sucks** " + Mentions[0].username;
      Message.reply(msg, {
        files: [image.file]
      }).catch(error => {
        Message.reply(msg +  "\n" + image.file);
        Message.channel.stopTyping();
      }).then(() => {
        Message.channel.stopTyping();
      });
    })
    .catch(error => {
      Message.channel.send("Error ocurred: ```\n" + error + "\n```");
    });
  }
}