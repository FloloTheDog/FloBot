/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
const fs = require("fs");
const fm = Buffer.from(fs.readFileSync(__dirname + "\/src\/floridaman.txt")).toString("utf8").split("\n");
function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}
module.exports = function(Message, Arguments, Client) {
	const f = fm[randomNumber(0, fm.length)];
	Message.channel.send({
		embed: {
			title: "Florida Man",
			description: f
		}
	});
}