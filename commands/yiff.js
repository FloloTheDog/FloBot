const Action = "yiff";
const IsNSFW = true;
const APIVer = "v1";
const axios = require("axios");
const fs = require("fs");
const e621 = require("../e621.js");
const GetImgType = function(Message) {
  let Channel = Message.channel;
  switch (Channel.id) {
    case "691349756806692864":
      return "gay";
    case "691349730118074480":
      return "straight";
    case "691349676888424478":
      return "straight";
    default:
      return "gay";
  }
}
module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  let Mentions = Message.mentions.users.array();
  let Pref = IsNSFW ? "nsfw" : "sfw";
  if (IsNSFW && !Message.channel.nsfw) {
    Message.channel.send("Lood dood, that command is for an NSFW channel x3");
    return;
  }
  /*let Class = `furry/${Pref}/${Action}/${GetImgType(Message)}`;
  let Endpoint = `https://api.furry.bot/${APIVer}/${Class}/image`;
  Message.channel.send(Mentions.length == 0 ? ("<@!" + Message.author.id + ">") : ("<@!" + Message.author.id + "> **" + Action + "ed** <@" + Mentions[0].id + ">"), {
    files: [
      {
        attachment: Endpoint,
        name: "image.jpeg"
      }
    ]
  });*/
  Message.channel.startTyping();
  e621(false, [
    "order:random",
    "rating:explicit",
    Mentions.length == 0
      ? "solo"
      : "-solo"
    ,
    "male",
    "-animated",
    "-young",
    "-pokemon",
    "-3d",
    "-flash",
    "high_res",
    "male/male",
    "score:>300"
  ]).then(image => {
    let msg = Mentions.length == 0 ? Message.author.username : Message.author.username + " **yiffs** " + Mentions[0].username;
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