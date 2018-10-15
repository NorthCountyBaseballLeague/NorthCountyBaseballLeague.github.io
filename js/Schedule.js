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

function addDelaysToWeeks(dateArr, dateToDelayFrom) {
    var substringDateToDelayFrom = dateToDelayFrom.split('/');
    var monthToDelayFrom = parseInt(substringDateToDelayFrom[0]);
    var dayToDelayFrom = parseInt(substringDateToDelayFrom[1]);
    var yearToDelayFrom = parseInt(substringDateToDelayFrom[2]);

    for (var i = 0; i < dateArr.length; i++) {
        var substringDate = dateArr[i].innerHTML.split('/');
        var month = parseInt(substringDate[0]);
        var day = parseInt(substringDate[1]);
        var year = parseInt(substringDate[2]);

        if (year >= yearToDelayFrom) {
            if (month >= monthToDelayFrom) {
                if (day >= dayToDelayFrom) {
                    day += 7;
                }
            }
        }

        dateArr[i].innerHTML = month + '/' + day + '/' + year;
    }
}

module.exports = {
    calculateWinsAndLosses,
    constructCounter,
    addDelaysToWeeks
}