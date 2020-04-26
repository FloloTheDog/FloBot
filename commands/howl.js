const Action = "howl";
const IsNSFW = false;
const APIVer = "v1";
const axios = require("axios");
const fs = require("fs");
module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  let Mentions = Message.mentions.users.array();
  let Pref = IsNSFW ? "nsfw" : "sfw";
  let Class = `furry/${Pref}/${Action}`;
  let Endpoint = `https://api.furry.bot/${APIVer}/${Class}/image`;
  Message.channel.send("<@!" + Message.author.id + "> **" + Action + "s**", {
    files: [
      {
        attachment: Endpoint,
        name: "image.jpeg"
      }
    ]
  });
}