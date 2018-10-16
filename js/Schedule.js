const monthsWith31Days = [1, 3, 5, 7, 8, 10];

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

        var isLaterYear = year > yearToDelayFrom;
        var isLaterMonth = month > monthToDelayFrom && year === yearToDelayFrom;
        var isLaterDay = day >= dayToDelayFrom && month === monthToDelayFrom && year === yearToDelayFrom;
        var dateShouldBeDelayed = isLaterYear || isLaterMonth || isLaterDay;

        if (dateShouldBeDelayed) {
            day += 7;
            if (month === 2) {
                if (year % 4 === 0) {
                    if (day > 29) {
                        month++;
                        day = day % 29;
                    }
                }
                else {
                    if (day > 28) {
                        month++;
                        day = day % 28;
                    }
                }
            }
            else if (month === 12) {
                if (day > 31) {
                    month = 1;
                    day = day % 31;
                    year++;
                }
            }
            else if (monthsWith31Days.includes(month)) {
                if (day > 31) {
                    month++;
                    day = day % 31;
                }
            }
            else {
                if (day > 30) {
                    month++;
                    day = day % 30;
                }
            }

            dateArr[i].innerHTML = month + '/' + day + '/' + year;
        }
    }
}

// TODO: Add functions to calculate the last 10 games record
// TODO: Add functions to calculate the win/loss streak

module.exports = {
    calculateWinsAndLosses,
    constructCounter,
    addDelaysToWeeks
}