'use strict';

const statsSortedByKey = {
    '#': true,
    'Player': false,
    'G': false,
    'AB': false,
    'R': false,
    'H': false,
    '2B': false,
    '3B': false,
    'HR': false,
    'RBI': false,
    'BB': false,
    'SO': false,
    'SB': false,
    'CS': false,
    'AVG': false,
    'OBP': false,
    'SLG': false,
    'OPS': false,
    'IBB': false,
    'HBP': false,
    'SAC': false,
    'SF': false,
    'TB': false,
    'XBH': false,
    'GDP': false,
    'GO': false,
    'AO': false,
    'GO_AO': false,
    'PA': false
}

function resetStatsSortedByKey() {
    Object.keys(statsSortedByKey).forEach(key => {
        statsSortedByKey[key] = false;
    });
}

function sortStatistics(statToSortBy, stats, statsHeader, statsBody, document) {
    if(!statsSortedByKey[statToSortBy]) {
        stats.sort((player1, player2) => {
            if (typeof player1[statToSortBy] === 'string' && typeof player2[statToSortBy] === 'string') {
                return player1[statToSortBy].localeCompare(player2[statToSortBy]);
            } else {
                return player2[statToSortBy] - player1[statToSortBy];
            }
        });
    } else {
        stats.reverse();
    }

    resetStatsSortedByKey();
    statsSortedByKey[statToSortBy] = true;
    buildStatistics(stats, statsHeader, statsBody, document);
}

function resetTableElement(element) {
    while(element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function buildStatistics(stats, statsHeader, statsBody, document) {
    resetTableElement(statsHeader);
    resetTableElement(statsBody);

    const headerRow = document.createElement('tr');
    Object.keys(stats[0]).forEach(statistic => {
        const headerElement = document.createElement('th');
        headerElement.innerHTML = statistic;
        headerElement.onclick = sortStatistics.bind(null, statistic, stats, statsHeader, statsBody, document);

        headerRow.appendChild(headerElement);
    });

    statsHeader.appendChild(headerRow);

    for (let i = 0; i < stats.length; i++) {
        const curPlayer = stats[i];
        const playerRow = document.createElement('tr');

        Object.keys(curPlayer).forEach(statistic => {
            const statElement = document.createElement('td');
            statElement.innerHTML = curPlayer[statistic];
            playerRow.appendChild(statElement);
        });

        statsBody.appendChild(playerRow);
    }
}


module.exports = {
    buildStatistics
};
