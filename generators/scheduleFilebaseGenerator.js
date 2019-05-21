'use strict';

const dateFormat = require('dateformat');
const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const writeToFileService = require('../services/writeToFile.service');

function formatDateAndTime(game) {
    if (typeof game.date !== 'string') {
        game.date = dateFormat(game.date, 'UTC:m/d/yyyy');
    }
    if (typeof game.time !== 'string') {
        game.time = dateFormat(game.time, 'shortTime');
    }
}

function appendTeams(game, firstGameDate, teams) {
    if (game.date === firstGameDate) {
        if (game.visitors) {
            teams.push(game.visitors);
        }
        if (game.home) {
            teams.push(game.home);
        }
    }
}

function appendTeamsAndFormatDateAndTime(schedulesObject) {
    let scheduleWithTeams = {};
    Object.keys(schedulesObject).forEach(schedule => {
        const currentSchedule = schedulesObject[schedule];
        const currentTeams = [];
        scheduleWithTeams[schedule] = {
            teams: currentTeams,
            schedule: currentSchedule
        };

        const firstGameDate = currentSchedule.length > 0 ? dateFormat(currentSchedule[0].date, 'UTC:m/d/yyyy') : '';
 
        currentSchedule.forEach(game => {
            formatDateAndTime(game)
            appendTeams(game, firstGameDate, currentTeams);
        });
    }); 
                    
    return scheduleWithTeams;
}

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

function buildSchedulesFilebase() {
    const sourceFile = 'filebase/NCBL Schedules.xlsx';
    
    const scheduleObject = convertExcelToJsonService.convert(sourceFile);
    const schedulesWithTeams = appendTeamsAndFormatDateAndTime(scheduleObject);
    
    const filebaseVarName = 'schedules';
    const schedulesFilebase = 'filebase/schedulesFilebase.js';

    writeToFileService.writeToFile(filebaseVarName, schedulesWithTeams, schedulesFilebase);
}

buildSchedulesFilebase();
