const Action = "propose";
const IsNSFW = false;
const APIVer = "v1";
const axios = require("axios");
const fs = require("fs");
module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  let Mentions = Message.mentions.users.array();
  if (Mentions && Mentions.length > 0 && Mentions[0].id == Message.author.id) {
    Message.channel.send("Oh? Using a command on yourself, eh? '~' Nu!!");
    return;
  }
  if (Mentions.length != 1) {
    Message.channel.send("Mention 1 person, silly!");
  } else {
    let MentionedUser = Mentions[0].id;
    let Pref = IsNSFW ? "nsfw" : "sfw";
    let Class = `furry/${Pref}/${Action}`;
    let Endpoint = `https://api.furry.bot/${APIVer}/${Class}/image`;
    Message.channel.send("<@!" + Message.author.id + "> **" + Action + "s** to <@" + MentionedUser + ">", {
      files: [
        {
          attachment: Endpoint,
          name: "image.jpeg"
        }
      ]
    });
  }
}
