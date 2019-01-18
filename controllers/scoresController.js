function scoresController(schedule) {
    function getScoresByTeams(team1, team2) {
        let scoresArray = [];

        schedule.forEach(game => {
            if(!game.visitorsScore || !game.homeScore) {
                return;
            }

            const gameScore = {};
            if(game.visitors === team1 && game.home === team2) {
                gameScore[team1] = game.visitorsScore;
                gameScore[team2] = game.homeScore;
                scoresArray.push(gameScore);
            }
            else if(game.visitors === team2 && game.home === team1) {
                gameScore[team1] = game.homeScore;
                gameScore[team2] = game.visitorsScore;
                scoresArray.push(gameScore);
            }
        });

        return scoresArray;
    }


    function didTeam1Win(team1Score, team2Score) {
        return team1Score > team2Score;
    }

    return {
        getScoresByTeams,
        didTeam1Win
    };
}

module.exports = scoresController;
