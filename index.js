var newTeam = {"name":"Regional Office","members":[{"user":"","team":"Local Office","role":"member","status":"active"},{"user":"simonfry.cscope.info.test1-at-gmail.com","team":"","role":"leader","status":"active"}]}

var beforeTeams = [
{
    "name": "Head Office",
    "members": [
        {
            "user": "",
            "team": "Regional Office",
            "role": "member",
            "status": "active"
        },
        {
            "user": "simonfry.cscope.info.test-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        }
    ]
}
,
{
    "name": "Regional Office",
    "members": [
        {
            "user": "",
            "team": "Local Office",
            "role": "member",
            "status": "active"
        },
        {
            "user": "simonfry.cscope.info.test-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        },
        {
            "user": "simonfry.cscope.info.test1-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        }
    ]
}
,
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
            "user": "lukeburch1234-at-gmail.com",
            "team": "",
            "role": "member",
            "status": "active"
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
            "role": "leader",
            "status": "active"
        }
    ]
}
,
{
    "name": "Local Office",
    "members": [
        {
            "user": "simonfry.cscope.info.test2-at-gmail.com",
            "team": "",
            "role": "leader",
            "status": "active"
        }
    ]
}
]

var teamFound = false;

for (var team in beforeTeams) { //loop through all teams in ddb
		if (beforeTeams[team].name==newTeam.name) { // if current iterating team matches api call team
			teamFound=true;
			for (var newMember in newTeam.members) { //iterate through api call team members
				var memberExists=false;
				for (var beforeMember in beforeTeams[team].members) { //iterate through ddb version of api call team members
					if (beforeTeams[team].members[beforeMember].user==newTeam.members[newMember].user
						&& beforeTeams[team].members[beforeMember].team==newTeam.members[newMember].team
						) {
						memberExists=true;
						if (newTeam.members[newMember].status=="resend"
							&& beforeTeams[team].members[beforeMember].status!="active") {
							// await teamFunctions.sendInvite(newTeam, newTeam.members[newMember], username);
						} else {
							newTeam.members[newMember].status=beforeTeams[team].members[beforeMember].status;
						}
						console.log("BB \n")
						console.log(beforeTeams[team])	
						beforeTeams[team].members.splice(beforeMember,1);
						console.log(beforeTeams[team])
						break;
					}
				}
				if (!memberExists) {
					// await teamFunctions.sendInvite(newTeam, newTeam.members[newMember], username);
				}
			}
			// teamFunctions.deleteTeam(beforeTeams[team]);
			// console.log(beforeTeams[team])
			break;
		}
}