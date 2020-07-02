const os = require("os");
const cpus = os.cpus();
let cpustr = "";
for (i in cpus) {
    cpustr += `[${i}]` + cpus[i].model + "\n";
}
module.exports = function(Message, Arguments, Client) {
	Message.reply({
		embed: {
			color: 3750201,
			title: "Statistics",
			description: `
	**FloStats**
	Uptime: ${os.uptime()}
	Endianness: ` + "`" + (os.endianness() == "LE" ? "Little Endian" : "Big Endian") + "`" + `
	Platform: ${os.platform()}
	CPUs: ` + "```\n" + cpustr.trim() + "\n```"
		}
	});
}