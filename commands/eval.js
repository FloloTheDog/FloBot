module.exports = function(msg, client, args) {
	if (msg.author.id != 299708692129906692 && msg.author.id != 720754256621338646) {
      msg.channel.send("Oops! Only the bot's creator can use this command (for safety purposes)");
      return;
    }
    let cmd = args.splice(1).join(" ").replace("--silent", "");
    try {
		let out = eval(";" + cmd);
		if (msg.content.match(/--silent/)){
			return;
		}
		msg.channel.send({
        	embed: {
          		color: 3553599,
          		title: "JavaScript Evaluated",
          		description: "```css\nNo problems while running the code\n```\n*Output:*\n```cs\n# " + out + "\n```"
		      }
      }).catch();
	} catch(output){
		msg.channel.send({
        	embed: {
          		color: 3553599,
          		title: "JavaScript Evaluation Error",
          		description: "```http\n" + output + "\n```"
			     }
    }).catch();
	}
}
