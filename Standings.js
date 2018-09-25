function calculateAllWinPercentages () {
    var winsEls = document.getElementsByClassName("wins");
    var lossesEls = document.getElementsByClassName("losses");
    var winPctsEls = document.getElementsByClassName("win-pct");

    for (var i = 0; i < winsEls.length; i++) {
        var wins = parseInt(winsEls[i].innerHTML);
        var losses = parseInt(lossesEls[i].innerHTML);

        winPctsEls[i].innerHTML = calculateIndividualWinPercentage(wins, losses);
    }
};

function calculateIndividualWinPercentage (wins, losses) {
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

calculateAllWinPercentages();

// TODO: Add tests

// TODO: Add functions to calculate the number of games behind
// TODO: Add functions to calculate the wins and losses
// TODO: Add functions to calculate the last 10 games record
// TODO: Add functions to calculate the win/loss streak

module.exports = {
    calculateAllWinPercentages,
    calculateIndividualWinPercentage,
    formatWinPercentage
}