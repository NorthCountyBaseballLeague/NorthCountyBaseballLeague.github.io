const monthsWith31Days = [1, 3, 5, 7, 8, 10];
const oneWeek = 7;
const January = 1;
const February = 2;
const December = 12;
const daysInFebOnLeapYear = 29;
const daysInFeb = 28;
const daysInDecember = 31;
const daysInMonthsWith31Days = 31;
const daysInMonthsWith30Days = 30;

function calculateWinsAndLosses(winnerElements, awayTeamElements, homeTeamElements, teams) {
    const recordCounter = constructRecordCounter(teams);

    for (let i = winnerElements.length - 1; i >= 0; i--) {
        if (winnerElements[i].innerHTML === awayTeamElements[i].innerHTML) {
            recordCounter[awayTeamElements[i].innerHTML][0] += 1;
            recordCounter[homeTeamElements[i].innerHTML][1] += 1;

            // Calculate last 10 games record
            if (recordCounter[awayTeamElements[i].innerHTML][2]
                + recordCounter[awayTeamElements[i].innerHTML][3] < 10) {
                recordCounter[awayTeamElements[i].innerHTML][2] += 1;
            }

            if (recordCounter[homeTeamElements[i].innerHTML][2]
                + recordCounter[homeTeamElements[i].innerHTML][3] < 10) {
                recordCounter[homeTeamElements[i].innerHTML][3] += 1;
            }

            // Calculate win/loss streak
            if (recordCounter[awayTeamElements[i].innerHTML][4] === '') {
                recordCounter[awayTeamElements[i].innerHTML][4] = 'W';
                recordCounter[awayTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[awayTeamElements[i].innerHTML][4] === 'W') {
                recordCounter[awayTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[awayTeamElements[i].innerHTML][4] === 'L') {
                recordCounter[awayTeamElements[i].innerHTML][4] = `L${recordCounter[awayTeamElements[i].innerHTML][5]}`;
            }

            if (recordCounter[homeTeamElements[i].innerHTML][4] === '') {
                recordCounter[homeTeamElements[i].innerHTML][4] = 'L';
                recordCounter[homeTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[homeTeamElements[i].innerHTML][4] === 'L') {
                recordCounter[homeTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[homeTeamElements[i].innerHTML][4] === 'W') {
                recordCounter[homeTeamElements[i].innerHTML][4] = `W${recordCounter[homeTeamElements[i].innerHTML][5]}`;
            }
        } else if (winnerElements[i].innerHTML === homeTeamElements[i].innerHTML && homeTeamElements[i].innerHTML !== '') {
            if (recordCounter[homeTeamElements[i].innerHTML]) {
                recordCounter[homeTeamElements[i].innerHTML][0] += 1;
            }
            recordCounter[awayTeamElements[i].innerHTML][1] += 1;

            // Calculate last 10 games record
            if (recordCounter[awayTeamElements[i].innerHTML][2]
                + recordCounter[awayTeamElements[i].innerHTML][3] < 10) {
                recordCounter[awayTeamElements[i].innerHTML][3] += 1;
            }

            if (recordCounter[homeTeamElements[i].innerHTML][2]
                + recordCounter[homeTeamElements[i].innerHTML][3] < 10) {
                recordCounter[homeTeamElements[i].innerHTML][2] += 1;
            }

            // Calculate win/loss streak
            if (recordCounter[awayTeamElements[i].innerHTML][4] === '') {
                recordCounter[awayTeamElements[i].innerHTML][4] = 'L';
                recordCounter[awayTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[awayTeamElements[i].innerHTML][4] === 'L') {
                recordCounter[awayTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[awayTeamElements[i].innerHTML][4] === 'W') {
                recordCounter[awayTeamElements[i].innerHTML][4] = `W${recordCounter[awayTeamElements[i].innerHTML][5]}`;
            }

            if (recordCounter[homeTeamElements[i].innerHTML][4] === '') {
                recordCounter[homeTeamElements[i].innerHTML][4] = 'W';
                recordCounter[homeTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[homeTeamElements[i].innerHTML][4] === 'W') {
                recordCounter[homeTeamElements[i].innerHTML][5] += 1;
            } else if (recordCounter[homeTeamElements[i].innerHTML][4] === 'L') {
                recordCounter[homeTeamElements[i].innerHTML][4] = `L${recordCounter[homeTeamElements[i].innerHTML][5]}`;
            }
        }
    }

    return recordCounter;
}

function constructRecordCounter(teams) {
    const counter = {};

    teams.forEach((team) => {
        counter[team] = [0, 0, 0, 0, '', 0];
    });

    return counter;
}

function addDelaysToWeeks(dateElements, dateToDelayFrom) {
    const substringDateToDelayFrom = dateToDelayFrom.split('/');
    const monthToDelayFrom = parseInt(substringDateToDelayFrom[0], 10);
    const dayToDelayFrom = parseInt(substringDateToDelayFrom[1], 10);
    const yearToDelayFrom = parseInt(substringDateToDelayFrom[2], 10);

    for (let i = 0; i < dateElements.length; i++) {
        const substringDate = dateElements[i].innerHTML.split('/');
        const month = parseInt(substringDate[0], 10);
        const day = parseInt(substringDate[1], 10);
        const year = parseInt(substringDate[2], 10);

        const isLaterYear = year > yearToDelayFrom;
        const isLaterMonth = month > monthToDelayFrom && year === yearToDelayFrom;
        const isLaterDay = day >= dayToDelayFrom && month === monthToDelayFrom
                                && year === yearToDelayFrom;
        const dateShouldBeDelayed = isLaterYear || isLaterMonth || isLaterDay;

        addDelayToDate(dateShouldBeDelayed, day, month, year, dateElements[i]);
    }
}

function addDelayToDate(dateShouldBeDelayed, day, month, year, dateElement) {
    if (dateShouldBeDelayed) {
        day += oneWeek;
        if (month === February) {
            if (year % 4 === 0) {
                if (day > daysInFebOnLeapYear) {
                    month += 1;
                    day %= daysInFebOnLeapYear;
                }
            } else if (day > daysInFeb) {
                month += 1;
                day %= daysInFeb;
            }
        } else if (month === December) {
            if (day > daysInDecember) {
                month = January;
                day %= daysInDecember;
                year += 1;
            }
        } else if (monthsWith31Days.includes(month)) {
            if (day > daysInMonthsWith31Days) {
                month += 1;
                day %= daysInMonthsWith31Days;
            }
        } else if (day > daysInMonthsWith30Days) {
            month += 1;
            day %= daysInMonthsWith30Days;
        }

        dateElement.innerHTML = `${month}/${day}/${year}`;
    }
}

// TODO: Add functions to calculate the win/loss streak

module.exports = {
    calculateWinsAndLosses,
    constructRecordCounter,
    addDelaysToWeeks,
};
