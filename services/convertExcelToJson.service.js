'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

function convert(sourceFile) {
    return excelToJson({
        sourceFile: sourceFile,
        header: {
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        }
    });
}

module.exports = {
    convert
}