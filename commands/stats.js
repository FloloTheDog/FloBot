const os = require("os");
const cpus = os.cpus();
let cpustr = "";
///cpus = [...cpus, ...cpus];
for (i in cpus) {
    cpustr += `[${i}] ` + cpus[i].model + "\n";
}
module.exports = function(Message, Arguments, Client) {
	var ut_sec = os.uptime(); 
	var ut_min = ut_sec / 60; 
	var ut_hour = ut_min / 60; 
	var ut_day = ut_hour / 24; 
	
	ut_sec = Math.floor(ut_sec); 
	ut_min = Math.floor(ut_min); 
	ut_hour = Math.floor(ut_hour); 
	ut_day = Math.floor(ut_hour); 

	ut_day = ut_day % 24; 
	ut_hour = ut_hour % 60; 
	ut_min = ut_min % 60; 
	ut_sec = ut_sec % 60; 
	  
	console.log(); 
	Message.reply({
		embed: {
			color: 3750201,
			title: "Statistics",
			description: `
	**FloStats**
	Uptime: `
	    + ut_day + " days(s) " 
	    + ut_hour + " hour(s) " 
	    + ut_min + " minute(s) and " 
	    + ut_sec + " second(s)" + `
	Endianness: ` + "`" + (os.endianness() == "LE" ? "Little Endian" : "Big Endian") + "`" + `
	Platform: ${os.platform()} [${os.type()}]
	Release: ${os.release()}
	Architecture: ${os.arch()}
	CPUs: ` + "```\n" + cpustr.trim() + "\n```"
		}
	});
}