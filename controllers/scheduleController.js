const schedules = require('../filebase/schedulesFilebase');

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

function scheduleController() {
    function getSchedule(year, season) {
        const id = year + season;

        const scheduleObject = schedules[id];

        return scheduleObject;
    }

    function addDelaysToWeeks(dateElements, dateToDelayFrom) {
        var substringDateToDelayFrom = dateToDelayFrom.split('/');
        var monthToDelayFrom = parseInt(substringDateToDelayFrom[0]);
        var dayToDelayFrom = parseInt(substringDateToDelayFrom[1]);
        var yearToDelayFrom = parseInt(substringDateToDelayFrom[2]);
    
        for (var i = 0; i < dateElements.length; i++) {
            var substringDate = dateElements[i].innerHTML.split('/');
            var month = parseInt(substringDate[0]);
            var day = parseInt(substringDate[1]);
            var year = parseInt(substringDate[2]);
    
            var isLaterYear = year > yearToDelayFrom;
            var isLaterMonth = month > monthToDelayFrom && year === yearToDelayFrom;
            var isLaterDay = day >= dayToDelayFrom && month === monthToDelayFrom && year === yearToDelayFrom;
            var dateShouldBeDelayed = isLaterYear || isLaterMonth || isLaterDay;
    
            addDelayToDate(dateShouldBeDelayed, day, month, year, dateElements[i])
        }
    };
    
    function addDelayToDate(dateShouldBeDelayed, day, month, year, dateElement) {
        if (dateShouldBeDelayed) {
            day += oneWeek;
            if (month === February) {
                if (year % 4 === 0) {
                    if (day > daysInFebOnLeapYear) {
                        month++;
                        day = day % daysInFebOnLeapYear;
                    }
                }
                else {
                    if (day > daysInFeb) {
                        month++;
                        day = day % daysInFeb;
                    }
                }
            }
            else if (month === December) {
                if (day > daysInDecember) {
                    month = January;
                    day = day % daysInDecember;
                    year++;
                }
            }
            else if (monthsWith31Days.includes(month)) {
                if (day > daysInMonthsWith31Days) {
                    month++;
                    day = day % daysInMonthsWith31Days;
                }
            }
            else {
                if (day > daysInMonthsWith30Days) {
                    month++;
                    day = day % daysInMonthsWith30Days;
                }
            }
    
            dateElement.innerHTML = month + '/' + day + '/' + year;
        }
    };

    return {
        getSchedule,
        addDelaysToWeeks
    };
}

module.exports = scheduleController;
