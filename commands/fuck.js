module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  Message.channel.send("_ _").then(msg => {
      setTimeout(() => {
          msg.edit("Fuck you");
      }, 30e3);
  });
}