function scoresController(schedulesFilebase) {
    function getScores(season) {
        const scheduleObject = schedulesFilebase[season];

        if (!scheduleObject) {
            this.schedule = {};
            return;
        }

        this.schedule = scheduleObject.schedule;
    }

    function getScoresByTeams(team1, team2) {
        let scoresArray = [];

        this.schedule.forEach(game => {
            if (!game.visitorsScore && !game.homeScore) {
                return;
            }

            const gameScore = {};
            if (game.visitors === team1 && game.home === team2) {
                gameScore[team1] = game.visitorsScore;
                gameScore[team2] = game.homeScore;
                scoresArray.push(gameScore);
            }
            else if (game.visitors === team2 && game.home === team1) {
                gameScore[team1] = game.homeScore;
                gameScore[team2] = game.visitorsScore;
                scoresArray.push(gameScore);
            }
        });

        return scoresArray;
    }

    function getTeamWithMoreWins(scoresArray) {
        const team1 = Object.keys(scoresArray[0])[0];
        const team2 = Object.keys(scoresArray[0])[1];
        let team1Wins = 0;
        let team2Wins = 0;
        let totalTeam1Score = 0;
        let totalTeam2Score = 0;

        scoresArray.forEach(game => {
            const team1Score = game[team1];
            const team2Score = game[team2];
            totalTeam1Score += team1Score;
            totalTeam2Score += team2Score;

            if (didTeam1Win(team1Score, team2Score)) {
                team1Wins += 1;
            }
            else {
                team2Wins += 1;
            }
        });

        const equalAmountOfWins = team1Wins === team2Wins;
        const team2HasMoreWins = team1Wins < team2Wins;
        const team2HasBetterScore = equalAmountOfWins && totalTeam1Score < totalTeam2Score;

        return (team2HasMoreWins || team2HasBetterScore) ? team2 : team1;
    }

    function didTeam1Win(team1Score, team2Score) {
        return team1Score > team2Score;
    }

    function buildScores(dateSelector, scoresTables, document) {
        let prevDate;
        let tableBody;

        for (let i = 0; i < this.schedule.length; i++) {
            const curGame = this.schedule[i];

            if(!curGame.visitorsScore && !curGame.homeScore) {
                continue;
            }

            const curDate = curGame.date;

            if (prevDate !== curDate) {
                const newDateOption = document.createElement('option');
                newDateOption.value = curDate;
                const newDateOptionText = document.createTextNode(curDate);
                newDateOption.appendChild(newDateOptionText);
                dateSelector.appendChild(newDateOption);

                prevDate = curDate;
            }

            // Create a new table
            const table = document.createElement('table');
            // table.id = curDate;
            // table.cellpadding = '5';

            // Build the header of the table
            const tableHead = document.createElement('thead');
            const headRow = document.createElement('tr');
            const visitorsColumn = document.createElement('th');
            const blankHeadColumn = document.createElement('th');
            const homeColumn = document.createElement('th');
            const visitorsColumnText = document.createTextNode('Visitors');
            const homeColumnText = document.createTextNode('Home');
            visitorsColumn.appendChild(visitorsColumnText);
            homeColumn.appendChild(homeColumnText);
            homeColumn.classList.add('last_column');
            headRow.appendChild(visitorsColumn);
            headRow.appendChild(blankHeadColumn);
            headRow.appendChild(blankHeadColumn);
            headRow.appendChild(homeColumn);
            tableHead.appendChild(headRow);
            table.appendChild(tableHead);

            // Create a new table body
            const newTableBody = document.createElement('tbody');

            // Populate the table body
            const scoreRow = document.createElement('tr');
            const visitorTeam = document.createElement('td');
            const visitorsScore = document.createElement('td');
            const homeScore = document.createElement('td');
            const homeTeam = document.createElement('td');


        }
    }

    return {
        getScores,
        getScoresByTeams,
        getTeamWithMoreWins,
        didTeam1Win,
        buildScores
    };
}

module.exports = scoresController;
