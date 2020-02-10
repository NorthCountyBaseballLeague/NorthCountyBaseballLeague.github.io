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

function delaysToScheduleService() {
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
    
    function addDelaysToWeeks(schedules, seasonToDelay, dateToDelayFrom) {
        const substringDateToDelayFrom = dateToDelayFrom.split('/');
        const monthToDelayFrom = parseInt(substringDateToDelayFrom[0]);
        const dayToDelayFrom = parseInt(substringDateToDelayFrom[1]);
        const yearToDelayFrom = parseInt(substringDateToDelayFrom[2]);
    
        const scheduleToDelay = schedules[seasonToDelay].schedule;
    
        scheduleToDelay.forEach(game => {
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
    
    function addAllDelaysToSchedules(schedulesWithTeams) {
        addDelaysToWeeks(schedulesWithTeams, '2018fall', '1/6/2019');
        addDelaysToWeeks(schedulesWithTeams, '2018fall', '1/13/2019');
        addDelaysToWeeks(schedulesWithTeams, '2018fall', '2/3/2019');
        addDelaysToWeeks(schedulesWithTeams, '2018fall', '2/17/2019');
        addDelaysToWeeks(schedulesWithTeams, '2018fall', '3/3/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019spring', '5/19/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019spring', '5/26/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019spring', '7/28/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019spring', '9/1/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019fall', '12/8/2019');
        addDelaysToWeeks(schedulesWithTeams, '2019fall', '2/9/2020');
    }

    return {
        addAllDelaysToSchedules
    }
}

module.exports = delaysToScheduleService;