/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
// pagefile command loader
module.exports = {
	// "name of command": require("./commandfile.js")
	"ping": require("./ping.js"), // test command; simple ping/pong example
  "cat": require("./cat.js"),
  "fox": require("./fox.js"),
  "bun": require("./bun.js"),
  "husky": require("./husky.js"),
  "shiba": require("./shiba.js"),
  "wolf": require("./wolf.js"),
  "yiff": require("./yiff.js"),
  "621": require("./621.js"),
  "hug": require("./hug.js"),
  "ship": require("./ship.js"),
  "boop": require("./boop.js"),
  "hold": require("./hold.js"),
  "kiss": require("./kiss.js"),
  "howl": require("./howl.js"),
  "lick": require("./lick.js"),
  "suck": require("./suck.js"),
  "cuddle": require("./cuddle.js"),
  "yiff": require("./yiff.js"),
  "propose": require("./propose.js"),
  "howcute": require("./howcute.js"),
  "howgay": require("./howgay.js"),
  //"blush": require("./blush.js"),
  //"test": require("./test.js"),
  "fuck": require("./fuck.js"),
  "rape": require("./rape.js"),
  "roll": require("./roll.js"),
  "stats": require("./stats.js"),
  "ridaman": require("./floridaman.js"),
  "topic": require("./topic.js"),
  "eval": require("./eval.js"),
  "gitupdate": function(Message, Args, Client) {
    if (Message.author.id != 299708692129906692 && Message.author.id != 720754256621338646) {
      Message.channel.send("Oops! Only the bot's creator can use this command (for safety purposes)");
      return;
    }
    Message.channel.send("Roger roger, pulling latest commit and exiting.")
        .then(process.exit)
        .catch(process.exit);
  },
	// add an entry for every command
  
  
  "help": function(Message, Args, Client) {
    let cmds = [];
    for (let cmd in this) {
      cmds.push("flo" + cmd);
    }
    Message.channel.send(`**Commands:**\n${cmds.join(", ")}`);
  }
}
