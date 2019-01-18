const winsIndex = 0;
const lossesIndex = 1;
const last10WinsIndex = 2;
const last10LossesIndex = 3;
const streakIndex = 4;
const streakCountIndex = 5;
const winPctIndex = 6;
const gamesBehindIndex = 7;
const last10Index = 8;

function standingsController(schedulesFilebase, scoresController) {
    function getStandings(season) {
        const scheduleObject = schedulesFilebase[season];

        if (!scheduleObject) {
            return {};
        }
        
        let standings = calculateWinsLossesAndStreak(scheduleObject.schedule, scheduleObject.teams);
        calculateAllWinPercentages(standings);
        standings = sortStandings(standings);
        calculateAllGamesBehind(standings);
        formatLast10Games(standings);
        const teams = Object.keys(standings);

        return { teams, standings };
    }

    function calculateWinsLossesAndStreak(schedule, teams) {
        const recordCounter = constructRecordCounter(teams);

        for (let i = schedule.length - 1; i >= 0; i--) {
            const visitorsWon = schedule[i].winner === schedule[i].visitors;
            const homeWon = schedule[i].winner === schedule[i].home && schedule[i].home !== '';
            
            if (visitorsWon || homeWon) {
                incrementWinsAndLosses(recordCounter[schedule[i].visitors], recordCounter[schedule[i].home], visitorsWon)
                updateLast10GamesRecord(recordCounter[schedule[i].visitors], recordCounter[schedule[i].home], visitorsWon);
                updateStreak(recordCounter[schedule[i].visitors], recordCounter[schedule[i].home], visitorsWon);
            }
        }

        formatWinStreak(recordCounter);
        return recordCounter;
    }

    function constructRecordCounter(teams) {
        const counter = {};

        teams.forEach((team) => {
            counter[team] = [0, 0, 0, 0, '', 0];
        });

        return counter;
    }

    function incrementWinsAndLosses(visitors, home, visitorsWon) {
        if(visitorsWon) {
            visitors[winsIndex] += 1;
            home[lossesIndex] += 1;
        } else {
            home[winsIndex] += 1;
            visitors[lossesIndex] += 1;
        }
    }

    function updateLast10GamesRecord(visitors, home, visitorsWon) {
        const last10Only = 10;
        if (visitors[last10WinsIndex] + visitors[last10LossesIndex] < last10Only) {
            if (visitorsWon) {
                visitors[last10WinsIndex] += 1;
            }
            else {
                visitors[last10LossesIndex] += 1;
            }
        }

        if (home[last10WinsIndex] + home[last10LossesIndex] < last10Only) {
            if (visitorsWon) {
                home[last10LossesIndex] += 1;
            }
            else {
                home[last10WinsIndex] += 1;
            }
        }
    }

    function updateStreak(visitors, home, visitorsWon) {
        const winCheck = 'W';
        const lossCheck = 'L';
        let visitorsCheck;
        let homeCheck;

        if(visitorsWon) {
            visitorsCheck = winCheck;
            homeCheck = lossCheck;
        } else {
            visitorsCheck = lossCheck;
            homeCheck = winCheck;
        }

        if (visitors[streakIndex] === '') {
            visitors[streakIndex] = visitorsCheck;
            visitors[streakCountIndex] += 1;
        } else if (visitors[streakIndex] === visitorsCheck) {
            visitors[streakCountIndex] += 1;
        } else if (visitors[streakIndex] === homeCheck) {
            visitors[streakIndex] = homeCheck + visitors[streakCountIndex];
        }

        if (home[streakIndex] === '') {
            home[streakIndex] = homeCheck;
            home[streakCountIndex] += 1;
        } else if (home[streakIndex] === homeCheck) {
            home[streakCountIndex] += 1;
        } else if (home[streakIndex] === visitorsCheck) {
            home[streakIndex] = visitorsCheck + home[streakCountIndex];
        }
    }

    function formatWinStreak(records) {
        Object.keys(records).forEach((team) => {
            if (records[team][streakIndex].length === 0) {
                records[team][streakIndex] = '-';
            }
            else if (records[team][streakIndex].length === 1) {
                records[team][streakIndex] += records[team][streakCountIndex];
            }
        });
    }

    function calculateAllWinPercentages(standings) {
        Object.keys(standings).forEach((team) => {
            const wins = standings[team][winsIndex];
            const losses = standings[team][lossesIndex];

            standings[team].push(calculateIndividualWinPercentage(wins, losses));
        });
    }

    function calculateIndividualWinPercentage(wins, losses) {
        if (wins + losses === 0) {
            return '0.000';
        }

        const winPct = wins / (wins + losses);
        const roundedWinPct = Math.round(winPct * 1000) / 1000;

        return formatWinPercentage(roundedWinPct);
    }

    function formatWinPercentage(winPct) {
        const expectWinPctStringLength = 5;
        let winPctStr = winPct.toString();

        if (winPctStr.length === 1) {
            winPctStr += '.';
        }

        while (winPctStr.length < expectWinPctStringLength) {
            winPctStr += '0';
        }

        return winPctStr;
    }

    function sortStandings(standings) {
        const newStandings = {};
        Object.keys(standings).sort((team1, team2) => {
            const team1WinPct = parseFloat(standings[team1][winPctIndex]);
            const team2WinPct = parseFloat(standings[team2][winPctIndex]);
            if(team1WinPct === team2WinPct) {
                const scoresArray = scoresController.getScoresByTeams(team1, team2);
                const teamWithMoreWins = scoresController.getTeamWithMoreWins(scoresArray);
                return teamWithMoreWins === team2 ? 1 : -1;
            }
            else {
                return team2WinPct - team1WinPct;
            }
        }).forEach((team) => {
            newStandings[team] = standings[team];
        });

        return newStandings;
    }

    function calculateAllGamesBehind(standings) {
        const firstPlaceWins = standings[Object.keys(standings)[0]][winsIndex];
        const firstPlaceLosses = standings[Object.keys(standings)[0]][lossesIndex];

        Object.keys(standings).forEach((team) => {
            const winDiff = firstPlaceWins - standings[team][winsIndex];
            const lossDiff = standings[team][lossesIndex] - firstPlaceLosses;
            const gb = (winDiff + lossDiff) / 2;

            standings[team].push(formatGamesBehind(gb));
        });
    }

    function formatGamesBehind(gamesBehind) {
        if (gamesBehind === 0) {
            return '-';
        }

        let gamesBehindStr = gamesBehind.toString();
        if (!gamesBehindStr.includes('.')) {
            gamesBehindStr += '.0';
        }

        return gamesBehindStr;
    }

    function formatLast10Games(standings) {
        Object.keys(standings).forEach((team) => {
            const formattedLast10 = `${standings[team][last10WinsIndex]}-${standings[team][last10LossesIndex]}`
            standings[team].push(formattedLast10);
        });
    }

    function buildStandings(teams, standings, standingsBody, document) {
        for (let i = 0; i < teams.length; i++) {
            const curTeam = teams[i];
            const curTeamStandings = standings[curTeam];

            const row = document.createElement('tr');

            const team = document.createElement('td');
            const wins = document.createElement('td');
            const losses = document.createElement('td');
            const winPct = document.createElement('td');
            const gamesBehind = document.createElement('td');
            const lastTen = document.createElement('td');
            const streak = document.createElement('td');

            const teamText = document.createTextNode(curTeam);
            const winsText = document.createTextNode(curTeamStandings[winsIndex]);
            const lossesText = document.createTextNode(curTeamStandings[lossesIndex]);
            const winPctText = document.createTextNode(curTeamStandings[winPctIndex]);
            const gamesBehindText = document.createTextNode(curTeamStandings[gamesBehindIndex]);
            const last10Text = document.createTextNode(curTeamStandings[last10Index]);
            const streakText = document.createTextNode(curTeamStandings[streakIndex]);
            
            team.appendChild(teamText);
            wins.appendChild(winsText);
            losses.appendChild(lossesText);
            winPct.appendChild(winPctText);
            gamesBehind.appendChild(gamesBehindText);
            lastTen.appendChild(last10Text);
            streak.appendChild(streakText);

            row.appendChild(team);
            row.appendChild(wins);
            row.appendChild(losses);
            row.appendChild(winPct);
            row.appendChild(gamesBehind);
            row.appendChild(lastTen);
            row.appendChild(streak);

            standingsBody.appendChild(row);
        }
    }

    return {
        getStandings,
        calculateWinsLossesAndStreak,
        calculateAllWinPercentages,
        sortStandings,
        calculateAllGamesBehind,
        formatLast10Games,
        buildStandings
    };
}

module.exports = standingsController;
