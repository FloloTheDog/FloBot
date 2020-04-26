const request = require("request");
module.exports = function(Message, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
  request("http://sheri.bot/api/husky", function(Error, Response, Body) {
    let Base = JSON.parse(Body);
    let Image = Base.url;
    Message.reply({
      files: [
        Image
      ]
    });
  });
}