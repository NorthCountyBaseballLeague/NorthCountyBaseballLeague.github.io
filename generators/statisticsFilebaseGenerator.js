'use strict';

const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const fs = require('fs');

function generateFileString(jsonString) {
    const declarationString = 'const stats = ';
    let jsFileString = declarationString + jsonString + ';';
    const exportString = '\n\nmodule.exports = stats;';
    jsFileString += exportString;
    return jsFileString;
}

function writeToFile () {
    const sourceFile = 'filebase/NCBL Statistics.xlsx';
    const jsonObject = convertExcelToJsonService.convert(sourceFile);
    const jsonString = JSON.stringify(jsonObject);
    const jsFileString = generateFileString(jsonString);
    const statsFile = 'filebase/statisticsFilebase.js';
    fs.writeFile(statsFile, jsFileString, 'utf8', function(err) {
        if (err) {
            console.log('There was an error: ', err);
        }
    });
}

module.exports = writeToFile();
