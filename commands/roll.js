module.exports = function(Message, Client, Arguments) {
    let Max = Arguments[0] ? Arguments[0] : 10;
	let Roll = Math.floor(Math.random() * Max) + 1;

	Message.channel.send("**Roll result**: `" + Roll + "` (min=0; max=" + Max + ")");
	// an alternative method would be "Message.reply()",
	//which also precedes the message by mentioning the user
}