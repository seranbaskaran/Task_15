const data = [
    {
        "prizeSplitUp": { "1-5": 1000, "6-10": 800, "11-100": 500 },
        "jointUsers": {
            "testUser1": {
                "userName": "testUser1",
                "userTeams": {
                    "T1": {
                        "teamName": "T1",
                        "points": 10
                    },
                    "T2": {
                        "teamName": "T2",
                        "points": 15
                    },
                    "T3": {
                        "teamName": "T3",
                        "points": 55
                    }
                }
            },
            "testUser2": {
                "userName": "testUser2",
                "userTeams": {
                    "T1": {
                        "teamName": "T1",
                        "points": 31
                    },
                    "T2": {
                        "teamName": "T2",
                        "points": 12
                    },
                    "T3": {
                        "teamName": "T3",
                        "points": 44
                    }
                }
            }
        }
    }
];

const allTeams = [];
const globalTeamRanks = {};

data.forEach((val) => {
    const users = val.jointUsers;
    for (const userKey in users) {
        const user = users[userKey];
        const userTeams = user.userTeams;

        for (const teamKey in userTeams) {
            const team = userTeams[teamKey];
            allTeams.push({ ...team, userName: user.userName }); // Add the team to the allTeams array with the user name
        }
    }
});

allTeams.sort((a, b) => b.points - a.points);

for (let i = 0; i < allTeams.length; i++) {
    const team = allTeams[i];
    const rank = i + 1;
    team.globalRank = rank;
    team.prize = getPrize(data[0].prizeSplitUp, rank);
    
    // Store the global rank in the object for global team ranks
    if (!globalTeamRanks[team.teamName]) {
        globalTeamRanks[team.teamName] = [];
    }
    globalTeamRanks[team.teamName].push({ userName: team.userName, globalRank: rank });
}

function getPrize(value, price) {
    for (let j in value) {
        const range = j.split('-');
        if (price >= parseInt(range[0]) && price <= parseInt(range[1])) {
            return value[j];
        }
    }
}

console.log("Updated Data:", data);
console.log("Global Team Ranks:", globalTeamRanks);
