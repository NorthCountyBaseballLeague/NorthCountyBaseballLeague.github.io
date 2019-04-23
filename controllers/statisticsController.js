'use strict';

function buildStatistics(stats, statsHeader, statsBody, document) {
    const headerRow = document.createElement('tr');
    Object.keys(stats[0]).forEach(statistic => {
        const headerElement = document.createElement('th');
        const headerElementText = document.createTextNode(statistic);
        headerElement.appendChild(headerElementText);
        headerRow.appendChild(headerElement);
    });

    statsHeader.appendChild(headerRow);

    for (let i = 0; i < stats.length; i++) {
        const curPlayer = stats[i];
        const playerRow = document.createElement('tr');

        Object.keys(curPlayer).forEach(statistic => {
            const statElement = document.createElement('td');
            const statElementText = document.createTextNode(curPlayer[statistic]);
            statElement.appendChild(statElementText);
            playerRow.appendChild(statElement);
        });

        statsBody.appendChild(playerRow);
    }
}


module.exports = {
    buildStatistics
};
