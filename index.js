var teams = [
{
    "name": "Team B",
    "members": [
        {
            "user": "lbtester11-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "active"
        },
        {
            "user": "lbtester111-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "active"
        },
        {
            "user": "lukeburch1234-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "invited",
            "hash": "4ccf4ee9"
        },
        {
            "user": "yachtsamba.samba-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        }
    ]
}
,
{
    "name": "Team A",
    "members": [
        {
            "user": "lbtester1-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "active",
            "hash": "a65fd004"
        },
        {
            "user": "lbtester11-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "active"
        },
        {
            "user": "lukeburch1234-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        },
        {
            "user": "yachtsamba.samba-at-gmail.com",
            "team": "",
            "role": "member",
            "status": "active"
        }
    ]
}
,
{
    "name": "Team C",
    "members": [
        {
            "user": "lbtester111-at-icloud.com",
            "team": "",
            "role": "member",
            "status": "active"
        },
        {
            "user": "lukeburch1234-at-icloud.com",
            "team": "",
            "role": "leader",
            "status": "active"
        }
    ]
}
];

var username = "yachtsamba.samba-at-gmail.com";

function getSubTeams(allTeams, srcTeam, loopCheck, thisUser) {
	console.log("getSubTeams allTeams " + JSON.stringify(allTeams));
	console.log("getSubTeams srcTeam " + JSON.stringify(srcTeam));
	console.log("getSubTeams loopCheck " + JSON.stringify(loopCheck));
	var destTeams = [];
	var memberIndex;
	for (memberIndex in srcTeam.members) {
		//console.log("getSubTeams member "+JSON.stringify(srcTeam.members[memberIndex]));
		if ("team" in srcTeam.members[memberIndex]
			&& srcTeam.members[memberIndex].team != ""
			&& srcTeam.members[memberIndex].status == "active") { // if member is an active team
			//console.log("getSubTeams subTeam "+srcTeam.members[memberIndex].team);
			var found = false;
			var loopCheckIndex;
			for (loopCheckIndex in loopCheck) {
				if (loopCheck[loopCheckIndex] == srcTeam.members[memberIndex].team) {
					found = true; // stop recursive loops. We've seen this team already
					break;
				}
			}
			if (!found) {
				//console.log("getSubTeams subTeam is not dup "+srcTeam.members[memberIndex].team);
				loopCheck.push(srcTeam.members[memberIndex].team);
				var subTeamIndex;
				for (subTeamIndex in allTeams) {
					if (allTeams[subTeamIndex].name == srcTeam.members[memberIndex].team
						&& thisUser.role == "leader"
					) {
						//console.log("getSubTeams adding subTeam "+srcTeam.members[memberIndex].team);
						destTeams.push(allTeams[subTeamIndex]);
						destTeams.push(...getSubTeams(allTeams, allTeams[subTeamIndex], loopCheck, thisUser));
						break;
					}
				}
			} else {
				break; // recursion has hit a loop and we need to stop
			}
		}
	}
	return destTeams;
}

function filterTeamsForUser(srcTeams, username) {
	var destTeams = [];

	var teamIndex;
	var subTeamIndex;
	var memberIndex;
	var thisUser = {};
	for (teamIndex in srcTeams) {
		for (memberIndex in srcTeams[teamIndex].members) {
			if (srcTeams[teamIndex].members[memberIndex].user == username) thisUser = srcTeams[teamIndex].members[memberIndex];
		}
	}
	for (teamIndex in srcTeams) {
		for (memberIndex in srcTeams[teamIndex].members) {
			if (srcTeams[teamIndex].members[memberIndex].user == username
				//&& srcTeams[teamIndex].members[memberIndex].role=='leader'
			) { // if the user is in the team as a leader or member they can see it
				destTeams.push(srcTeams[teamIndex]);
				break;
			}
		}
	}

	// recursively look for sub teams of the teams this user can see
	var loopCheck = [];
	var subTeams = [];
	for (teamIndex in destTeams) {
		subTeams.push(...getSubTeams(srcTeams, destTeams[teamIndex], loopCheck, thisUser));
	}
	console.log("filterTeamsForUser subTeams " + JSON.stringify(subTeams));
	destTeams.push(...subTeams);
	console.log("\n Dest Teams \n");
	console.log(destTeams)
	// // look for teams lead by members of teams this user leads
	var teamMembers = [];
	var memberIndex;
	// get a list of all the members this user leads
	for (teamIndex in srcTeams) {
		var thisTeam = srcTeams[teamIndex];
		var found = false;
		console.log("filterTeamsForUser looking for members " + JSON.stringify(thisTeam));
		for (memberIndex in thisTeam.members) {
			var thisMember = thisTeam.members[memberIndex];
			console.log("filterTeamsForUser looking for members " + JSON.stringify(thisMember));
			if (thisMember.user == username && thisMember.role == "leader" && thisMember.status == "active") {
				found = true;
				break;
			}
		}
		if (found) { // user leads this team
			console.log("filterTeamsForUser got leader " + JSON.stringify(thisMember));
			for (memberIndex in thisTeam.members) {
				var thisMember = thisTeam.members[memberIndex];
				if (thisMember.user != username) {
					console.log("filterTeamsForUser adding member " + JSON.stringify(thisMember));
					teamMembers.push(thisMember);
				}
			}
		}
	}
	console.log("\n Team Members \n ");
	console.log(teamMembers);
	// // look for all the teams lead by members in list
	for (teamIndex in srcTeams) {
		var thisTeam = srcTeams[teamIndex];
		for (memberIndex in thisTeam.members) {
			var thisMember = thisTeam.members[memberIndex];
			console.log(" \n This member");
			console.log(thisMember);
			if (thisMember.role == "leader" && thisMember.status == "active") {
				console.log("filterTeamsForUser found leader " + JSON.stringify(thisMember));
				var found = false;
				var teamMemberIndex;
				for (teamMemberIndex in teamMembers) {
					var thisTeamMember = teamMembers[teamMemberIndex];
					if (thisTeamMember.status == "active" && thisTeamMember.user == thisMember.user) {
						found = true;
						break;
					}
				}
				if (found) { // a member leads this team
					destTeams.push(thisTeam);
					break;
				}
			}
		}
	}
	console.log("\n Dest Teams \n");
	console.log(destTeams)

	// // remove duplicates
	// dedupTeams = [];
	// function compareTeams(a, b) {
	// 	if (a.name > b.name) return 1;
	// 	if (a.name < b.name) return -1;
	// 	return 0;
	// }
	// console.log("teams with dups unsorted " + JSON.stringify(destTeams));
	// destTeams.sort(compareTeams);
	// console.log("teams with dups " + JSON.stringify(destTeams));
	// var lastTeam = { name: "" };
	// for (teamIndex in destTeams) {
	// 	console.log("teams with dups destTeams " + destTeams[teamIndex].name);
	// 	console.log("teams with dups lastTeam " + lastTeam.name);
	// 	if (destTeams[teamIndex].name != lastTeam.name) {
	// 		dedupTeams.push(destTeams[teamIndex]);
	// 	}
	// 	lastTeam = destTeams[teamIndex];
	// }
	// console.log("teams without dups " + JSON.stringify(dedupTeams));

	// return dedupTeams;
}

filterTeamsForUser(teams, username)