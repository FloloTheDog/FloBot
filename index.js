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
  "720771089516462122",
  "720771089747279940",
  "720771090145869882",
  "720771090456117319",
  "720771089516462126"
]

const SpecCmds = [
  "topic"
]

const dogEmoji = String.fromCharCode("55357");

const updateMemberCount = function() {
  Client.channels.get("720771089038442553").edit({
    name: dogEmoji
    + Client.guilds.get("720771088677601362").memberCount +
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
  
  if (Channel.id == "720771089747279939") {
    return cleverbotReply(Message);
  }

	if (Content.toLowerCase().startsWith(Prefix)) { // if the message starts with our prefix
		let TrimmedContent = Content.replace(Prefix, ""); // remove the first instance of our prefix
		let Command = TrimmedContent.toLowerCase().replace(Prefix, "").split(" ")[0]; // the command the user has provided
		let Arguments = TrimmedContent.split(" ").slice(1); // gives us our arguments provided
    	console.log(Commands[Command]);
		if (Commands[Command]) { // check if the command exists
      console.log(Command);
      if (Guild && Guild.id == 720771088677601362 && !GuildMember.roles.find(r => r.id == 720784791577821275) && !SpecCmds.includes(Command)) {
        console.log("Special def req [" + Guild.id + "]");
        let isAllowed = false;
        for (i in SpecList) {
          console.log(i, SpecList[i]);
          if (SpecList[i] == Channel.id) isAllowed = true;
        }
        if (!isAllowed) {
          Message.channel.send("FloBot commands can only be used by Nitro boosters in this channel!~ >w>\n(For non-Nitro boosters, you can use FloBot commands in <#720771089516462122> and <#720771089747279940>.)").then(msg => {
            setTimeout(() => {
              Message.delete().catch();
              msg.delete().catch();
            }, 15e3);
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

/*Client.on("guildMemberAdd", function(GuildMember) {
	if (GuildMember.guild.id !== "v") return;
	let msg = `Welcome to **Afo Super Server**, ${GuildMember.user.username}! Please take a moment to introduce yourself in <#720771089516462120>, and grab your roles in <#720771089323655184>!`;
	let file = {
		attachment: "https://i.imgur.com/MlPK9ys.png",
		name: "welcome.png"
	}
	GuildMember.user.send(msg, {
		tts: true
	}).catch(() => {
		GuildMember.guild.channels.get(ch => ch.id == "696176819317243984").send("<@!" + GuildMember.user.id  + "> " + msg, {
			files: [
				file
			]
		}).catch(console.error);
	});
  updateMemberCount();
});*/
Client.on("guildMemberRemove", function(GuildMember) {
	if (GuildMember.guild.id !== "720771088677601362") return;
  updateMemberCount();
})

const WSMsgChannel = Client.channels.get("720771089747279939");
var wsconnection;
const wsconnect = async function() {
  wsclient.connect("wss://socket.chiefhappiness.co/socket.io/?EIO=3&transport=websocket", "echo-protocol");
}
async function cleverbotReply(Message) {
  Message.channel.startTyping();
  if (wsconnection && wsconnection.connected) {
    wsconnection.send(`42[
        "chatSubmit", {
            "userId": "yQ5R",
            "displayName": "Flolo",
            "profilePhotoUri": "2020_4/i3bmcc5wbm_eve1ug_1586110259064.png"
        }, {
            "chatRoomId": "y98n",
            "messages": [
                "${Message.content || 'Hello'}"
            ],
            "platform":"web"
        }, {
            "api_key":"ee53e4b8-faf3-4392-8e93-cd94191beb05",
            "timestamp":"${Date.now()}",
            "secret":"MTU5Mjg3NTA5NzIwMA=="
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
  //login
  connection.send(`42[
    "login", {
        "userId": "yQ5R",
        "displayName": "Flolo",
        "profilePhotoUri": "2020_4/i3bmcc5wbm_eve1ug_1586110259064.png"
    }, {
        "status": "ONLINE",
        "friendIds": []
    }, {
        "api_key": "ee53e4b8-faf3-4392-8e93-cd94191beb05",
        "timestamp": "${Date.now()}",
        "secret": "NjUzMDc4OTI3NDQ4MDA="
    }
  ]`);
  //connection.
  connection.send(`42[
    "subscribe", {
        "userId": "yQ5R",
        "displayName": "Flolo",
        "profilePhotoUri": "2020_4/i3bmcc5wbm_eve1ug_1586110259064.png"
        
    }, {
        "chatRoomIds": [
            "GZG6"
        ]
        
    }, {
        "api_key":"ee53e4b8-faf3-4392-8e93-cd94191beb05",
        "timestamp":"${Date.now()}",
        "secret":"MTI5MDIyNzExNTUwMTAw"
    }
  ]`);
  let interv = setInterval(function() {
    connection.send(`42[
        "typing", {
            "userId": "yQ5R",
            "displayName": "Flolo",
            "profilePhotoUri": "2020_4/i3bmcc5wbm_eve1ug_1586110259064.png"
        }, {
            "chatRoomId":"y98n"
        }, {
            "api_key": "ee53e4b8-faf3-4392-8e93-cd94191beb05",
            "timestamp":"${Date.now()}",
            "secret":"MTI5MDIyODk3NzEyNDAw"
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
    console.log(message);
    if (message.type === "utf8") {
      let content = message.utf8Data;
      if (content.startsWith("42")) {
        try {
          let c = JSON.parse(content.replace("42", ""));
          if (c.length > 1 && c[1] && c[1].data) {
            Client.channels.get("720771089747279939").stopTyping();
            if (c[1].data.interaction && c[1].data.interaction.narration) {
              Client.channels.get("720771089747279939").send(`*${c[1].data.interaction.narration.replace(/Hyana/gmi, "").trim()}*`);
            } else if (c[1].data.action == "petMessage") {
              console.log("[WS] Chat event");
              let msg = c[1].data.message.message.replace(/Hyana/gmi, "FloBot").replace(/Flolo/gmi, "master");
              Client.channels.get("720771089747279939").send(msg);
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
