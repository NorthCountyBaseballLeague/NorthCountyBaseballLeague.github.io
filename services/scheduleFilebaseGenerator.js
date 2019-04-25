'use strict';
const dateFormat = require('dateformat');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

function convertToJson () {
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

function appendTeams(schedulesObject) {
    let scheduleWithTeams = {};
    Object.keys(schedulesObject).forEach(schedule => {
        const currentSchedule = schedulesObject[schedule];
        scheduleWithTeams[schedule] = {
            schedule: currentSchedule
        };

        schedulesObject[schedule].forEach(game => {
            // currentSchedule.time = 
            console.log(dateFormat(game.date, 'shortDate'));
            console.log(dateFormat(game.date, 'shortTime'));
        });
    });
}

function generateFileString(jsonString) {
    const declarationString = 'const schedule = ';
    let jsFileString = declarationString + jsonString + ';';
    const exportString = '\n\nmodule.exports = schedule;';
    jsFileString += exportString;
    return jsFileString;
}

function writeToFile () {
    const schedulesObject = convertToJson();
    const schedulesWithTeams = appendTeams(schedulesObject);
    console.log('this is the object', schedulesObject);
    const schedulesString = JSON.stringify(schedulesWithTeams);
    const jsFileString = generateFileString(schedulesString);
    const schedulesFilebase = 'filebase/testSchedule.js';
    fs.writeFile(schedulesFilebase, jsFileString, 'utf8', function(err) {
        if (err) {
            console.log('There was an error: ', err);
        }
    });
}

module.exports = writeToFile();
