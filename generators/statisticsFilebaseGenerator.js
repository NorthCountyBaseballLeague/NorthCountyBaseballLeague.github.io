'use strict';

const convertExcelToJsonService = require('../services/convertExcelToJson.service');
const writeToFileService = require('../services/writeToFile.service');

function buildStatsFilebase () {
    const sourceFile = 'filebase/NCBL Statistics.xlsx';

    const statsObject = convertExcelToJsonService.convert(sourceFile);

    const filebaseVarName = 'stats';
    const statsFilebase = 'filebase/statisticsFilebase.js';

    writeToFileService.writeToFile(filebaseVarName, statsObject, statsFilebase);
}

module.exports = buildStatsFilebase();
