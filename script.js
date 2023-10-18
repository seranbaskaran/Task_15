const data = [
    {
      "prizeSplitUp": { "1-5": 1000, "6-10": 800, "10-100": 500 },
      "jointUsers": {
        "testUser1": {
          "userName": "testUser",
          "userTeams": {
            "T1": {
              "teamName": "T1",
              "points": 10
            },
            "T2": {
              "teamName": "T1",
              "points": 15
            },
            "T3": {
              "teamName": "T1",
              "points": 55
            }
          }
        },
        "testUser2": {
          "userName": "testUser",
          "userTeams": {
            "T1": {
              "teamName": "T1",
              "points": 31
            },
            "T2": {
              "teamName": "T1",
              "points": 12
            },
            "T3": {
              "teamName": "T1",
              "points": 44
            }
          }
        }
      }
    }
]  

/* data.forEach((val) => {
    const users = val.jointUsers;
    for (const userKey in users) {
            const user = users[userKey];
            console.log(user);
            const userTeams = user.userTeams;
            console.log(userTeams);
            //console.log(Object.keys(userTeams));
            const sortedTeams = Object.keys(userTeams).sort((teamA, teamB) => {
                return userTeams[teamB].points - userTeams[teamA].points;
            });
        
            sortedTeams.forEach((team, index) => {
                userTeams[team].rank = index + 1;
            });
    }
}); */
/* sortedTeams.forEach((team, index) => {
    userTeams[team].rank = index + 1;
});
 */
data.forEach((val) => {
    const users = val.jointUsers;
    for (const userKey in users) {
        const user = users[userKey];
        const userTeams = user.userTeams;
        const teamsWithRank1 = Object.keys(userTeams).sort((teamA, teamB) => {
            return userTeams[teamB].points - userTeams[teamA].points;
        });
        teamsWithRank1.forEach((team, index) => {
                userTeams[team].rank = index + 1;
            });
        // Create an array to store team objects with rank and initial prize
        /* const teamsWithRank = Object.keys(userTeams).map((team) => {
            return {
                team: team,
                points: userTeams[team].points,
                rank: 0, 
                prize: 0 
            };
        }); */
        console.log(teamsWithRank1)
        teamsWithRank1.sort((a, b) => b.points - a.points);
        teamsWithRank1.forEach((teamObject, index) => {
            const rank = index + 1;
            teamObject.rank = rank;
            teamObject.prize = getPrize(val.prizeSplitUp, rank); // Get prize based on rank
            userTeams[teamObject.team] = {
                ...userTeams[teamObject.team],
                rank: rank,
                prize: teamObject.prize
            };
        });
    }
});

function getPrize(value,price){
    for(j in value){
        if(price>=j.split('-')[0] && price<=j.split('-')[1]){

            return value[j];
        }
    }
  }



 /* 
 
  for (const teamName in teams) {
    const team = teams[teamName];
    team.points.sort((a, b) => b - a); // Sort points in descending order
    team.rank = team.points.indexOf(team.points[0]) + 1; // Calculate rank
    if (team.rank <= 5) {
      team.prize = data[0].prizeSplitUp["1-5"];
    } else if (team.rank <= 10) {
      team.prize = data[0].prizeSplitUp["6-10"];
    } else {
      team.prize = data[0].prizeSplitUp["10-100"];
    }
  } */
  

  console.log(data);
 
  
  
  
  