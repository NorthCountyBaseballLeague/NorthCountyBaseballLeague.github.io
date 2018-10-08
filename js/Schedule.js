function calculateWinsAndLosses (winnersArr, awayTeamArr, homeTeamArr, teams) {
    var winCounter = constructCounter(teams);
    var lossCounter = constructCounter(teams);

    for (var i = 0; i < winnersArr.length; i++) {
        if (winnersArr[i].innerHTML === awayTeamArr[i].innerHTML) {
            winCounter[awayTeamArr[i].innerHTML]++;
            lossCounter[homeTeamArr[i].innerHTML]++;
        }
        else if (winnersArr[i].innerHTML === homeTeamArr[i].innerHTML && homeTeamArr[i].innerHTML !== "") {
            winCounter[homeTeamArr[i].innerHTML]++;
            lossCounter[awayTeamArr[i].innerHTML]++;
        }
    }

    return [winCounter, lossCounter];

};

function constructCounter(teams) {
    var counter = {};

    teams.forEach(team => {
        counter[team] = 0;
    });

    return counter;
};

module.exports = {
    calculateWinsAndLosses,
    constructCounter
}