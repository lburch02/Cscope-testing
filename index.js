var memberTeamArray = [{"Team":"Team 1","User":"lukeburch1234-at-gmail.com","devices":[{"model":"MXL","generation":"4","user":"lukeburch1234-at-gmail.com","owner":"lukeburch1234-at-gmail.com","id":"lukeburch1234-at-gmail.com/lukeburch1234-at-gmail.com/MXL-4-101010","serial":101010},{"model":"MXL","generation":"4","user":"lukeburch1234-at-gmail.com","owner":"lukeburch1234-at-gmail.com","id":"lukeburch1234-at-gmail.com/lukeburch1234-at-gmail.com/MXL-4-222222","serial":222222}]},{"Team":"Team 1","User":"yachtsamba.samba-at-gmail.com","devices":[{"model":"MXL","generation":"4","user":"yachtsamba.samba-at-gmail.com","owner":"yachtsamba.samba-at-gmail.com","id":"yachtsamba.samba-at-gmail.com/yachtsamba.samba-at-gmail.com/MXL-4-275856","serial":275856},{"model":"MXL","generation":"4","user":"yachtsamba.samba-at-gmail.com","owner":"yachtsamba.samba-at-gmail.com","id":"yachtsamba.samba-at-gmail.com/yachtsamba.samba-at-gmail.com/MXL-4-333333","serial":333333}]},{"Team":"Team 2","User":"lukeburch1234-at-icloud.com","devices":[{"model":"MXL","generation":"4","user":"lukeburch1234-at-icloud.com","owner":"lukeburch1234-at-icloud.com","id":"lukeburch1234-at-icloud.com/lukeburch1234-at-icloud.com/MXL-4-444444","serial":444444}]},{"Team":"Team 2","User":"yachtsamba.samba-at-gmail.com","devices":[{"model":"MXL","generation":"4","user":"yachtsamba.samba-at-gmail.com","owner":"yachtsamba.samba-at-gmail.com","id":"yachtsamba.samba-at-gmail.com/yachtsamba.samba-at-gmail.com/MXL-4-275856","serial":275856},{"model":"MXL","generation":"4","user":"yachtsamba.samba-at-gmail.com","owner":"yachtsamba.samba-at-gmail.com","id":"yachtsamba.samba-at-gmail.com/yachtsamba.samba-at-gmail.com/MXL-4-333333","serial":333333}]}]

var teamObj = {};

for (teamIndex in memberTeamArray) {
	if (!(memberTeamArray[teamIndex].Team  in teamObj)) {
		// console.log("Not in")
		teamObj[memberTeamArray[teamIndex].Team] = {};
		teamObj[memberTeamArray[teamIndex].Team].devices = [];
		teamObj[memberTeamArray[teamIndex].Team].members = [];
	}
	teamObj[memberTeamArray[teamIndex].Team].devices = teamObj[memberTeamArray[teamIndex].Team].devices.concat(memberTeamArray[teamIndex].devices)
	teamObj[memberTeamArray[teamIndex].Team].members.push(memberTeamArray[teamIndex].User)
 }

console.log(JSON.stringify(teamObj))

for (team in teamObj) {
	var teamOption = {};
	teamOption.name = team;
	teamOption.devices = teamObj[team].devices;
	
}