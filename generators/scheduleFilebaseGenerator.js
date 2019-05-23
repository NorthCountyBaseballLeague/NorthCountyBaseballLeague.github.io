'use strict';

const dateFormat = require('dateformat');
const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const writeToFileService = require('../services/writeToFile.service');
const { addAllDelaysToSchedules } = require('../services/delaysToSchedule.service')();

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

function buildSchedulesFilebase() {
    const sourceFile = 'filebase/NCBL Schedules.xlsx';

    const scheduleObject = convertExcelToJsonService.convert(sourceFile);
    const schedulesWithTeams = appendTeamsAndFormatDateAndTime(scheduleObject);

    addAllDelaysToSchedules(schedulesWithTeams)

    const filebaseVarName = 'schedules';
    const schedulesFilebase = 'filebase/schedulesFilebase.js';

    writeToFileService.writeToFile(filebaseVarName, schedulesWithTeams, schedulesFilebase);
}

buildSchedulesFilebase();
