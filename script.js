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

const allTeams = []; // Create an array to store all teams
const teamRanks = {}; // Create an object to store team ranks globally

data.forEach((val) => {
    const users = val.jointUsers;

    for (const userKey in users) {
        const user = users[userKey];

        const userTeams = user.userTeams;

        for (const teamKey in userTeams) {
            const team = userTeams[teamKey];
            allTeams.push(team); // Add the team to the allTeams array
        }
    }
});

allTeams.sort((a, b) => b.points - a.points);

allTeams.forEach((team, index) => {
    const rank = index + 1;
    team.rank = rank;
    team.prize = getPrize(data[0].prizeSplitUp, rank);
    //teamRanks[team.teamName] = rank; // Store the team rank globally
});

function getPrize(value, price) {
    for (let j in value) {
        const range = j.split('-');
        if (price >= parseInt(range[0]) && price <= parseInt(range[1])) {
            return value[j];
        }
    }
}
console.log(data);
//console.log("Global Team Ranks:", teamRanks);
