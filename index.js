/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
const Discord = require("discord.js"); // load the discord.js library
const Client = new Discord.Client(); // create new client object
const express = require('express');
const app = express();
const WebSocketClient = require('websocket').client;
const wsclient = new WebSocketClient();

const Commands = require("./commands/_pagefile.js"); // load commands
const Config = require("./config.js"); // load config
const Prefix = Config.Prefix; // bot prefix "!" by default
const Token = Config.Token; // bot token

const SpecList = [ // flolo serber
  "696175255709810720",
  "703106446220328960",
  "701857669958467595",
  "699744420798660638"
]

const dogEmoji = String.fromCharCode("55357");

const updateMemberCount = function() {
  Client.channels.get("697301898394337330").edit({
    name: dogEmoji
    + Client.guilds.get("696160005967314985").memberCount +
    " members" + dogEmoji
  });
}

Client.on("ready", () => { // emitted when bot is ready
	Client.user.setGame('with Flolo', 'https://youtube.com/watch?v=dQw4w9WgXcQ')
    .catch(console.error);
	console.log("[MAIN] Locked and loaded!");
  updateMemberCount();
});

Client.on("message", (Message) => { // emitted whenever someone sends a message
	let Guild = Message.guild; // can most likely be shortened to "Message.guild"; the server the message was sent in
	let User = Message.user; // the person who sent the message
  let GuildMember = Message.member;
  let Channel = Message.channel;
	let Content = Message.content; // the contents of the message
  
  if (Message.author.bot) return; //make sure they are a human
  
  if (Channel.id == "696428646017269852") {
    return cleverbotReply(Message);
  }

	if (Content.toLowerCase().startsWith(Prefix)) { // if the message starts with our prefix
		let TrimmedContent = Content.replace(Prefix, ""); // remove the first instance of our prefix
		let Command = TrimmedContent.toLowerCase().replace(Prefix, "").split(" ")[0]; // the command the user has provided
		let Arguments = TrimmedContent.split(" ").slice(1); // gives us our arguments provided
    	console.log(Commands[Command]);
		if (Commands[Command]) { // check if the command exists
      console.log(Command);
      if (Guild && Guild.id == 696160005967314985 && !GuildMember.roles.find(r => r.id == 696216363613683783)) {
        console.log("Special def req [" + Guild.id + "]");
        let isAllowed = false;
        for (i in SpecList) {
          console.log(i, SpecList[i]);
          if (SpecList[i] == Channel.id) isAllowed = true;
        }
        if (!isAllowed) {
          Message.channel.send("FloBot commands can only be used by Nitro boosters in this channel!~ >w>").then(msg => {
            setTimeout(() => {
              msg.delete();
            }, 5e3);
          });
          return;
        }
      }
			try {
				Commands[Command](Message, Client, Arguments);
			} catch(Error) {
				Message.channel.send(">.> An unexpected error ocurred while attempting to perform the selected function. Additional information:\n```" + Error + "\n```")
					.catch(console.error); // something went really wrong >.>
			}
		} else {
			// provide help if command doesnt exist
			//Message.channel.send(">.> Function does not exist.")
     	return;
		}
	}
});

Client.on("guildMemberAdd", function(GuildMember) {
	if (GuildMember.guild.id !== "696160005967314985") return;
	let msg = `Welcome to the **Cutie Corner**, ${GuildMember.user.username}! Please take a moment to introduce yourself in <#696176959402672198>, and specify your roles in <#696176683488641084>!
	__**Please note**:__ In an effort to stop raids, you cannot talk in the server until you are verified (fastest way to get verified is introduce yourself) so when you're ready, head on over to <#696176959402672198>!
  ***NEW MEMBERS CANNOT SEND IMAGES:*** You must be in the server for at least a week before you can send images in channels.`;
	let file = {
		attachment: "https://i.imgur.com/MlPK9ys.png",
		name: "welcome.png"
	}
	GuildMember.user.send(msg, {
		tts: true,
		files: [
			file
		]
	}).catch(() => {
		GuildMember.guild.channels.get(ch => ch.id == "696176819317243984").send("<@!" + GuildMember.user.id  + "> " + msg, {
			files: [
				file
			]
		}).catch(console.error);
	});
  updateMemberCount();
});
Client.on("guildMemberRemove", function(GuildMember) {
	if (GuildMember.guild.id !== "696160005967314985") return;
  updateMemberCount();
})

const WSMsgChannel = Client.channels.get("696428646017269852");
let wsconnection;
const wsconnect = async function() {
  wsclient.connect("wss://socket.chiefhappiness.co/socket.io/?EIO=3&transport=websocket", "echo-protocol");
}
async function cleverbotReply(Message) {
  Message.channel.startTyping();
  if (wsconnection && wsconnection.connected) {
    wsconnection.send(`42[
      "chatSubmit",
      {
        "userId":"L1aq",
        "displayName":"JohnDoe14",
        "profilePhotoUri":"null"
      },
      {
        "chatRoomId":"y98n",
        "messages": [
          "${Message.content.replace(/flobot/gmi, "Hyana")}"
        ],
        "platform":"web"
      },
      {
        "api_key":"${process.env.KAJIAPI}"
      }
    ]`);
  }
}

wsclient.on("connectFailed", function(error) {
  console.log("Connect Error: " + error.toString());
  wsconnection = undefined;
  wsconnect();
});
 
wsclient.on("connect", function(connection) {
  wsconnection = connection;
  console.log("[WS] Connection successful");
  //connection.
  connection.send(`42[
    "subscribe", {
      "userId":"L1aq",
      "displayName":"JohnDoe14",
      "profilePhotoUri":"null"
    },
    {
      "chatRoomIds": [
        "y98n"
      ]
    },
    {
      "api_key":"${process.env.KAJIAPI}"
    }
  ]`);
  let interv = setInterval(function() {
    connection.send(`42[
      "typing", {
        "userId":"L1aq",
        "displayName":"JohnDoe14",
        "profilePhotoUri":"null"
      }, {
        "chatRoomId":"y98n"
      }, {
        "api_key":"${process.env.KAJIAPI}"
      }
    ]`);
  }, 5000);
  connection.on("error", function(error) {
    console.log("[WS] Connection Error: " + error.toString());
    wsconnection = undefined;
  });
  connection.on("close", function() {
    clearInterval(interv);
    console.log("[WS] Connection dropped, attempting reconnect...");
    wsconnection = undefined;
    wsconnect();
  });
  connection.on("message", function(message) {
    wsconnection = connection;
    if (message.type === "utf8") {
      let content = message.utf8Data;
      if (content.startsWith("42")) {
        try {
          let c = JSON.parse(content.replace("42", ""));
          if (c.length > 1 && c[1] && c[1].data) {
            Client.channels.get("696428646017269852").stopTyping();
            if (c[1].data.interaction && c[1].data.interaction.narration) {
              Client.channels.get("696428646017269852").send(`*${c[1].data.interaction.narration.replace(/Hyana/gmi, "").trim()}*`);
            } else if (c[1].data.action == "petMessage") {
              console.log("[WS] Chat event");
              let msg = c[1].data.message.message.replace(/Hyana/gmi, "FloBot").replace(/Flolo/gmi, "master");
              Client.channels.get("696428646017269852").send(msg);
            }
          } else {
            //not a chat event
          }
        } catch(e) {
          console.error(e);
        }
      }
    }
  });
});

wsconnect();

Client.login(Token); // log in

app.get('/', (_, res) => res.sendStatus(200));
app.listen(3000);