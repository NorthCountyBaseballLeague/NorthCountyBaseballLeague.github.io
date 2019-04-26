'use strict';
const dateFormat = require('dateformat');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

function convertToJson() {
    return excelToJson({
        sourceFile: 'filebase/NCBL Schedules.xlsx',
        header: {
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
}

function appendTeamsAndFormatDateAndTime(schedulesObject) {
    let scheduleWithTeams = {};
    Object.keys(schedulesObject).forEach(schedule => {
        const currentSchedule = schedulesObject[schedule];
        scheduleWithTeams[schedule] = {
            teams: [],
            schedule: currentSchedule
        };

        const firstGameDate = currentSchedule.length > 0 ? dateFormat(currentSchedule[0].date, 'UTC:m/d/yyyy') : '';

        currentSchedule.forEach(game => {
            if (typeof game.date !== 'string') {
                game.date = dateFormat(game.date, 'UTC:m/d/yyyy');
            }
            if (typeof game.time !== 'string') {
                game.time = dateFormat(game.time, 'shortTime');
            }

            if (game.date === firstGameDate) {
                if (game.visitors) {
                    scheduleWithTeams[schedule].teams.push(game.visitors);
                }
                if (game.home) {
                    scheduleWithTeams[schedule].teams.push(game.home);
                }
            }
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
    const schedulesObject = convertToJson();
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
