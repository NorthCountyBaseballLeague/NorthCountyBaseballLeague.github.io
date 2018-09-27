const as = "A's";
const leones = "Leones";
const nationals = "Nationals";
const royals = "Royals";
const saints = "Saints";
const toros = "Toros";
const pending = "Pending";
const noWinner = "";

function calculateWinsAndLosses (winnersArr, awayTeamArr, homeTeamArr) {
    var winCounter = {
        "A's" : 0,
        "Leones" : 0,
        "Nationals" : 0,
        "Royals" : 0,
        "Saints" : 0,
        "Toros" : 0
    }
    var lossCounter = {
        "A's" : 0,
        "Leones" : 0,
        "Nationals" : 0,
        "Royals" : 0,
        "Saints" : 0,
        "Toros" : 0
    }

    for (var i = 0; i < winnersArr.length; i++) {
        if (winnersArr[i].innerHTML === awayTeamArr[i].innerHTML) {
            winCounter[awayTeamArr[i].innerHTML]++;
            lossCounter[homeTeamArr[i].innerHTML]++;
        }
        else if (winnersArr[i].innerHTML === homeTeamArr[i].innerHTML) {
            winCounter[homeTeamArr[i].innerHTML]++;
            lossCounter[awayTeamArr[i].innerHTML]++;
        }
    }

    return [winCounter, lossCounter];

};

// function filterOutNoWinners(winnersArr) {
//     for (var i = 0; i < winnersArr.length; i++) {
//         if ()
//     }
// }

module.exports = {
    calculateWinsAndLosses
}