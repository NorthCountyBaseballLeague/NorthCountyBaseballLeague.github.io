'use strict';
const dateFormat = require('dateformat');
const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const fs = require('fs');

function formatDateAndTime(game) {
    if (typeof game.date !== 'string') {
        game.date = dateFormat(game.date, 'UTC:m/d/yyyy');
    }
    if (typeof game.time !== 'string') {
        game.time = dateFormat(game.time, 'shortTime');
    }
}

function appendTeams (game, firstGameDate, teams) {
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

function generateFileString(jsonString) {
    const declarationString = 'const schedules = ';
    let jsFileString = declarationString + jsonString + ';';
    const exportString = '\n\nmodule.exports = schedules;';
    jsFileString += exportString;
    return jsFileString;
}

function writeToFile() {
    const sourceFile = 'filebase/NCBL Schedules.xlsx';
    const schedulesObject = convertExcelToJsonService.convert(sourceFile);
    const schedulesWithTeams = appendTeamsAndFormatDateAndTime(schedulesObject);
    const schedulesString = JSON.stringify(schedulesWithTeams);
    const jsFileString = generateFileString(schedulesString);
    const schedulesFilebase = 'filebase/schedulesFilebase.js';
    fs.writeFile(schedulesFilebase, jsFileString, 'utf8', function (err) {
        if (err) {
            console.log('There was an error: ', err);
        }
    });
}

module.exports = writeToFile();
