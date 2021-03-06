function scoresController(schedule) {
    function getScoresByTeams(team1, team2) {
        let scoresArray = [];

        schedule.forEach(game => {
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

    function createNewDateOption(document, curDate, dateSelector) {
        const newDateOption = document.createElement('option');
        newDateOption.value = curDate;
        const newDateOptionText = document.createTextNode(curDate);
        newDateOption.appendChild(newDateOptionText);
        dateSelector.appendChild(newDateOption);
    }

    function appendTableBodyAndTableToScoresTables(table, tableBody, scoresTables) {
        if (table && tableBody) {
            table.appendChild(tableBody);
            scoresTables.appendChild(table);
        }
    }

    function buildTableHeader(document, table) {
        const tableHead = document.createElement('thead');
        const headRow = document.createElement('tr');
        const visitorsColumn = document.createElement('th');
        const visitorsScoreColumn = document.createElement('th');
        const homeScoreColumn = document.createElement('th');
        const homeColumn = document.createElement('th');
        const visitorsColumnText = document.createTextNode('Visitors');
        const homeColumnText = document.createTextNode('Home');

        visitorsColumn.appendChild(visitorsColumnText);
        homeColumn.appendChild(homeColumnText);

        headRow.appendChild(visitorsColumn);
        headRow.appendChild(visitorsScoreColumn);
        headRow.appendChild(homeScoreColumn);
        headRow.appendChild(homeColumn);
        tableHead.appendChild(headRow);
        table.appendChild(tableHead);
    }

    function populateTableBody(document, curGame, tableBody) {
        const scoreRow = document.createElement('tr');
        const visitorTeam = document.createElement('td');
        const visitorsScore = document.createElement('td');
        const homeScore = document.createElement('td');
        const homeTeam = document.createElement('td');

        const visitorsTeamText = document.createTextNode(curGame.visitors);
        const visitorsScoreText = document.createTextNode(curGame.visitorsScore);
        const homeScoreText = document.createTextNode(curGame.homeScore);
        const homeTeamText = document.createTextNode(curGame.home);

        visitorTeam.appendChild(visitorsTeamText);
        visitorsScore.appendChild(visitorsScoreText);
        homeScore.appendChild(homeScoreText);
        homeTeam.appendChild(homeTeamText);

        visitorsScore.classList.add('middle-column');

        scoreRow.appendChild(visitorTeam);
        scoreRow.appendChild(visitorsScore);
        scoreRow.appendChild(homeScore);
        scoreRow.appendChild(homeTeam);

        tableBody.appendChild(scoreRow);
    }

    function buildScores(dateSelector, scoresTables, document) {
        let prevDate;
        let table;
        let tableBody;

        for (let i = 0; i < schedule.length; i++) {
            const curGame = schedule[i];

            if (!curGame.visitorsScore && !curGame.homeScore) {
                continue;
            }

            const curDate = curGame.date;

            if (prevDate !== curDate) {
                createNewDateOption(document, curDate, dateSelector)

                prevDate = curDate;

                appendTableBodyAndTableToScoresTables(table, tableBody, scoresTables)

                table = document.createElement('table');
                table.id = curDate;
                table.cellPadding = '5';

                buildTableHeader(document, table)

                tableBody = document.createElement('tbody');
            }

            populateTableBody(document, curGame, tableBody)
        }

        appendTableBodyAndTableToScoresTables(table, tableBody, scoresTables)
    }

    return {
        getScoresByTeams,
        getTeamWithMoreWins,
        didTeam1Win,
        buildScores
    };
}

module.exports = scoresController;
