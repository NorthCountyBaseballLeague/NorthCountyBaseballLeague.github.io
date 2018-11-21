function calculateAllWinPercentages(winsArray, lossesArray, winPctArray) {
    for (let i = 0; i < winsArray.length; i++) {
        const wins = parseInt(winsArray[i].innerHTML, 10);
        const losses = parseInt(lossesArray[i].innerHTML, 10);

        winPctArray[i].innerHTML = calculateIndividualWinPercentage(wins, losses);
    }
}

function calculateIndividualWinPercentage(wins, losses) {
    if (wins + losses === 0) {
        return '0.000';
    }

    const winPct = wins / (wins + losses);
    const roundedWinPct = Math.round(winPct * 1000) / 1000;

    return formatWinPercentage(roundedWinPct);
}

function formatWinPercentage(winPct) {
    let winPctStr = winPct.toString();

    if (winPctStr.length === 1) {
        winPctStr += '.';
    }

    while (winPctStr.length < 5) {
        winPctStr += '0';
    }

    return winPctStr;
}

function calculateAllGamesBehind(winsArray, lossesArray, gamesBehindArray) {
    const wins = [];
    const losses = [];

    for (let i = 0; i < winsArray.length; i++) {
        wins.push(parseInt(winsArray[i].innerHTML, 10));
        losses.push(parseInt(lossesArray[i].innerHTML, 10));

        const winDiff = wins[0] - wins[i];
        const lossDiff = losses[i] - losses[0];
        const gb = (winDiff + lossDiff) / 2;

        gamesBehindArray[i].innerHTML = formatGamesBehind(gb);
    }
}

function formatGamesBehind(gamesBehind) {
    if (gamesBehind === 0) {
        return '-';
    }

    let gamesBehindStr = gamesBehind.toString();
    if (!gamesBehindStr.includes('.')) {
        gamesBehindStr += '.0';
    }

    return gamesBehindStr;
}

module.exports = {
    calculateAllWinPercentages,
    calculateIndividualWinPercentage,
    formatWinPercentage,
    calculateAllGamesBehind,
    formatGamesBehind
};
