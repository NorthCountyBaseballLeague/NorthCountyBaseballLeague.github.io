function standingsController(schedulesFilebase) {
    function getStandings(year, season) {
        const id = year + season;

        const scheduleObject = schedulesFilebase[id];

        if(!scheduleObject) {
            return {};
        }

        let standings = calculateWinsAndLosses(scheduleObject.schedule, scheduleObject.teams);
        calculateAllWinPercentages(standings);
        standings = sortStandings(standings);
        calculateAllGamesBehind(standings);
        formatLast10Games(standings);
        const teams = Object.keys(standings);

        return { teams, standings };
    }

    function calculateWinsAndLosses(schedule, teams) {
        const recordCounter = constructRecordCounter(teams);

        for (let i = schedule.length - 1; i >= 0; i--) {
            if (schedule[i].winner === schedule[i].visitors) {
                recordCounter[schedule[i].visitors][0] += 1;
                recordCounter[schedule[i].home][1] += 1;

                // Calculate last 10 games record
                if (recordCounter[schedule[i].visitors][2]
                    + recordCounter[schedule[i].visitors][3] < 10) {
                    recordCounter[schedule[i].visitors][2] += 1;
                }

                if (recordCounter[schedule[i].home][2]
                    + recordCounter[schedule[i].home][3] < 10) {
                    recordCounter[schedule[i].home][3] += 1;
                }

                // Calculate win/loss streak
                if (recordCounter[schedule[i].visitors][4] === '') {
                    recordCounter[schedule[i].visitors][4] = 'W';
                    recordCounter[schedule[i].visitors][5] += 1;
                } else if (recordCounter[schedule[i].visitors][4] === 'W') {
                    recordCounter[schedule[i].visitors][5] += 1;
                } else if (recordCounter[schedule[i].visitors][4] === 'L') {
                    recordCounter[schedule[i].visitors][4] = `L${recordCounter[schedule[i].visitors][5]}`;
                }

                if (recordCounter[schedule[i].home][4] === '') {
                    recordCounter[schedule[i].home][4] = 'L';
                    recordCounter[schedule[i].home][5] += 1;
                } else if (recordCounter[schedule[i].home][4] === 'L') {
                    recordCounter[schedule[i].home][5] += 1;
                } else if (recordCounter[schedule[i].home][4] === 'W') {
                    recordCounter[schedule[i].home][4] = `W${recordCounter[schedule[i].home][5]}`;
                }
            } else if (schedule[i].winner === schedule[i].home && schedule[i].home !== '') {
                if (recordCounter[schedule[i].home]) {
                    recordCounter[schedule[i].home][0] += 1;
                }
                recordCounter[schedule[i].visitors][1] += 1;

                // Calculate last 10 games record
                if (recordCounter[schedule[i].visitors][2]
                    + recordCounter[schedule[i].visitors][3] < 10) {
                    recordCounter[schedule[i].visitors][3] += 1;
                }

                if (recordCounter[schedule[i].home][2]
                    + recordCounter[schedule[i].home][3] < 10) {
                    recordCounter[schedule[i].home][2] += 1;
                }

                // Calculate win/loss streak
                if (recordCounter[schedule[i].visitors][4] === '') {
                    recordCounter[schedule[i].visitors][4] = 'L';
                    recordCounter[schedule[i].visitors][5] += 1;
                } else if (recordCounter[schedule[i].visitors][4] === 'L') {
                    recordCounter[schedule[i].visitors][5] += 1;
                } else if (recordCounter[schedule[i].visitors][4] === 'W') {
                    recordCounter[schedule[i].visitors][4] = `W${recordCounter[schedule[i].visitors][5]}`;
                }

                if (recordCounter[schedule[i].home][4] === '') {
                    recordCounter[schedule[i].home][4] = 'W';
                    recordCounter[schedule[i].home][5] += 1;
                } else if (recordCounter[schedule[i].home][4] === 'W') {
                    recordCounter[schedule[i].home][5] += 1;
                } else if (recordCounter[schedule[i].home][4] === 'L') {
                    recordCounter[schedule[i].home][4] = `L${recordCounter[schedule[i].home][5]}`;
                }
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

    function formatWinStreak(records) {
        Object.keys(records).forEach((team) => {
            if (records[team][4].length === 0) {
                records[team][4] = '-';
            }
            else if (records[team][4].length === 1) {
                records[team][4] += records[team][5];
            }
        });
    }

    function calculateAllWinPercentages(standings) {
        Object.keys(standings).forEach((team) => {
            const wins = standings[team][0];
            const losses = standings[team][1];

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
        let winPctStr = winPct.toString();

        if (winPctStr.length === 1) {
            winPctStr += '.';
        }

        while (winPctStr.length < 5) {
            winPctStr += '0';
        }

        return winPctStr;
    }

    function sortStandings(standings) {
        const newStandings = {};
        Object.keys(standings).sort((a, b) => {
            const winPctA = parseFloat(standings[a][6]);
            const winPctB = parseFloat(standings[b][6]);
            return winPctB - winPctA;
        }).forEach((team) => {
            newStandings[team] = standings[team];
        });

        return newStandings;
    }

    function calculateAllGamesBehind(standings) {
        const firstPlaceWins = standings[Object.keys(standings)[0]][0];
        const firstPlaceLosses = standings[Object.keys(standings)[0]][1];

        Object.keys(standings).forEach((team) => {
            const winDiff = firstPlaceWins - standings[team][0];
            const lossDiff = standings[team][1] - firstPlaceLosses;
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
            const formattedLast10 = `${standings[team][2]}-${standings[team][3]}`
            standings[team].push(formattedLast10);
        });
    }

    return {
        getStandings,
        calculateWinsAndLosses,
        calculateAllWinPercentages,
        sortStandings,
        calculateAllGamesBehind,
        formatLast10Games
    };
}

module.exports = standingsController;
