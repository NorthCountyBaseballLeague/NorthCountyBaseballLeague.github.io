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

function scheduleController(schedulesFilebase) {
    function getSchedule(season) {
        const scheduleObject = schedulesFilebase[season];

        if (!scheduleObject) {
            return {};
        }

        return scheduleObject.schedule;
    }

    function addDelaysToWeeks(schedule, dateToDelayFrom) {
        const substringDateToDelayFrom = dateToDelayFrom.split('/');
        const monthToDelayFrom = parseInt(substringDateToDelayFrom[0]);
        const dayToDelayFrom = parseInt(substringDateToDelayFrom[1]);
        const yearToDelayFrom = parseInt(substringDateToDelayFrom[2]);
    
        schedule.forEach(game => {
            const substringDate = game.date.split('/');
            const month = parseInt(substringDate[0]);
            const day = parseInt(substringDate[1]);
            const year = parseInt(substringDate[2]);
    
            const isLaterYear = year > yearToDelayFrom;
            const isLaterMonth = month > monthToDelayFrom && year === yearToDelayFrom;
            const isLaterDay = day >= dayToDelayFrom && month === monthToDelayFrom && year === yearToDelayFrom;
            const dateShouldBeDelayed = isLaterYear || isLaterMonth || isLaterDay;
    
            addDelayToDate(dateShouldBeDelayed, day, month, year, game)
        }) 
    };
    
    function addDelayToDate(dateShouldBeDelayed, day, month, year, game) {
        if (dateShouldBeDelayed) {
            day += oneWeek;
            if (month === February) {
                if (year % 4 === 0) {
                    if (day > daysInFebOnLeapYear) {
                        month += 1;
                        day = day % daysInFebOnLeapYear;
                    }
                }
                else {
                    if (day > daysInFeb) {
                        month += 1;
                        day = day % daysInFeb;
                    }
                }
            }
            else if (month === December) {
                if (day > daysInDecember) {
                    month = January;
                    day = day % daysInDecember;
                    year += 1;
                }
            }
            else if (monthsWith31Days.includes(month)) {
                if (day > daysInMonthsWith31Days) {
                    month += 1;
                    day = day % daysInMonthsWith31Days;
                }
            }
            else {
                if (day > daysInMonthsWith30Days) {
                    month += 1;
                    day = day % daysInMonthsWith30Days;
                }
            }
    
            game.date = month + '/' + day + '/' + year;
        }
    };

    function buildSchedule(schedule, scheduleTable) {
        for(let i = 0; i < schedule.length; i++) {
            const curGame = schedule[i];

            const row = document.createElement('tr');

            const round = document.createElement('td');
            const date = document.createElement('td');
            const time = document.createElement('td');
            const visitors = document.createElement('td');
            const home = document.createElement('td');
            const field = document.createElement('td');
            const winner = document.createElement('td');

            const roundText = document.createTextNode('');
            const dateText = document.createTextNode(curGame.date);
            const timeText = document.createTextNode(curGame.time);
            const visitorsText = document.createTextNode(curGame.visitors);
            const homeText = document.createTextNode(curGame.home);
            const fieldText = document.createTextNode(curGame.field);
            const winnerText = document.createTextNode(curGame.winner);
            
            round.appendChild(roundText);
            date.appendChild(dateText);
            time.appendChild(timeText);
            visitors.appendChild(visitorsText);
            home.appendChild(homeText);
            field.appendChild(fieldText);
            winner.appendChild(winnerText);

            row.appendChild(round);
            row.appendChild(date);
            row.appendChild(time);
            row.appendChild(visitors);
            row.appendChild(home);
            row.appendChild(field);
            row.appendChild(winner);

            scheduleTable.appendChild(row);
        }       
    };

    return {
        getSchedule,
        addDelaysToWeeks,
        buildSchedule
    };
}

module.exports = scheduleController;
