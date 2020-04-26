/*
#     # #      # #     # 
#     # #      # #     # 
#     # #  ##  # #     # 
#     # # #  # # #     # 
 #####  #      #  #####  
 */
const documentId = '1QLJBnxi2sGs6PGoqTcPUTHL0m1Xmwk-0xm-a8i1XPL8';
const serviceEmail = 'myserviceaccount@wise-alpha-275110.iam.gserviceaccount.com';
const fs = require("fs");
const serviceKey = fs.readFileSync(__dirname + "/sheets.pem");
const Promise = require('polyfill-promise');
const Sheets = require('google-sheets-api').Sheets;
const sheets = new Sheets({ email: serviceEmail, key: serviceKey });
module.exports = function(Message, Arguments, Client) {
	// Where "Client" is the Discord Client object
	// Where "Message" is the Discord Message object
	// Where "Arguments" is the provided Arguments
	// user types: "!ping" (or whatever prefix you use)
	//bot responds: "Pong!"
	sheets.getSheets(documentId)
		.then(function(sheetsInfo) {
		// NOTE: Using first sheet in this example
			let sheetInfo = sheetsInfo[0];
			return Promise.all([
				sheets.getSheet(documentId, sheetInfo.id),
				sheets.getRange(documentId, sheetInfo.id, 'A1:A1')
			]);
		})
		.then(function(sheets) {
			Message.channel.send("{'content':'" + sheets[1] + "'}");
		})
		.catch(function(err){
			console.log(err);
		});
	// an alternative method would be "Message.reply()",
	//which also precedes the message by mentioning the user
}