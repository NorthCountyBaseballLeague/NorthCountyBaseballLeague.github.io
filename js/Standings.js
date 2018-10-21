function calculateAllWinPercentages (winsArray, lossesArray, winPctArray) {
    for (var i = 0; i < winsArray.length; i++) {
        var wins = parseInt(winsArray[i].innerHTML);
        var losses = parseInt(lossesArray[i].innerHTML);

        winPctArray[i].innerHTML = calculateIndividualWinPercentage(wins, losses);
    }
};

function calculateIndividualWinPercentage (wins, losses) {
    if (wins + losses === 0) {
        return "0.000";
    }

    var winPct = wins / (wins + losses);
    var roundedWinPct = Math.round(winPct * 1000) / 1000;

    return formatWinPercentage(roundedWinPct);
};

function formatWinPercentage (winPct) {
    var winPctStr = winPct.toString();

    if (winPctStr.length === 1) {
        winPctStr = winPctStr + ".";
    }

    while (winPctStr.length < 5) {
        winPctStr = winPctStr + "0";
    }

    return winPctStr;
};

function calculateAllGamesBehind (winsArray, lossesArray, gamesBehindArray) {
    var wins = [];
    var losses = [];

    for (var i = 0; i < winsArray.length; i++) {
        wins.push(parseInt(winsArray[i].innerHTML));
        losses.push(parseInt(lossesArray[i].innerHTML));

        var winDiff = wins[0] - wins[i];
        var lossDiff = losses[i] - losses[0];
        var gb = (winDiff + lossDiff) / 2;

        gamesBehindArray[i].innerHTML = formatGamesBehind(gb);
    }

};

function formatGamesBehind (gamesBehind) {
    if (gamesBehind === 0) {
        return "-";
    }
    
    var gamesBehindStr = gamesBehind.toString();
    if (!gamesBehindStr.includes(".")) {
        gamesBehindStr += ".0";
    }

    return gamesBehindStr;
};

module.exports = {
    calculateAllWinPercentages,
    calculateIndividualWinPercentage,
    formatWinPercentage,
    calculateAllGamesBehind,
    formatGamesBehind
}