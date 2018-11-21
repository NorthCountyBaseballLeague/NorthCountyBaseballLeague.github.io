const { expect } = require('chai');
const standings = require('../public/js/Standings');

describe("Standings Test", function () {
    describe("Tests for formatting the win percentage", function () {
        it('should format the win percentage correctly when a team has 0 wins', function () {
            var winPct = 0;

            var winPctStr = standings.formatWinPercentage(winPct);

            expect(winPctStr).to.equal("0.000");
        });
        it('should format the win percentage correctly when a team has 0 losses', function () {
            var winPct = 1;

            var winPctStr = standings.formatWinPercentage(winPct);

            expect(winPctStr).to.equal("1.000");
        });
        it('should format the win percentage correctly when a team has equal wins and losses', function () {
            var winPct = 0.5;

            var winPctStr = standings.formatWinPercentage(winPct);

            expect(winPctStr).to.equal("0.500");
        });
        it('should format the win percentage correctly when a team has unequal wins and losses', function () {
            var winPct1 = 0.25;
            var winPct2 = 0.75;
            var winPct3 = 0.542;
            var winPct4 = 0.017;

            var winPctStr1 = standings.formatWinPercentage(winPct1);
            var winPctStr2 = standings.formatWinPercentage(winPct2);
            var winPctStr3 = standings.formatWinPercentage(winPct3);
            var winPctStr4 = standings.formatWinPercentage(winPct4);

            expect(winPctStr1).to.equal("0.250");
            expect(winPctStr2).to.equal("0.750");
            expect(winPctStr3).to.equal("0.542");
            expect(winPctStr4).to.equal("0.017");
        });
    });

    describe("Tests for calculating individual win percentage", function () {
        it ('should return the correct win percentage when a team has not played any games', function () {
            var wins = 0;
            var losses = 0;

            var winPct = standings.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal("0.000");
        });
        it ('should return the correct win percentage when a team has no wins', function () {
            var wins = 0;
            var losses = 10;

            var winPct = standings.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal("0.000");
        });
        it ('should return the correct win percentage when a team has no losses', function () {
            var wins = 8;
            var losses = 0;

            var winPct = standings.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal("1.000");
        });
        it ('should return the correct win percentage when a team has equal number of wins and losses', function () {
            var wins = 5;
            var losses = 5;

            var winPct = standings.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal("0.500");
        });
        it ('should return the correct win percentage when a team has unequal wins and losses', function () {
            var wins1 = 12;
            var wins2 = 7;
            var wins3 = 4;
            var wins4 = 2;
            var losses1 = 13;
            var losses2 = 3;
            var losses3 = 16;
            var losses4 = 9;

            var winPct1 = standings.calculateIndividualWinPercentage(wins1, losses1);
            var winPct2 = standings.calculateIndividualWinPercentage(wins2, losses2);
            var winPct3 = standings.calculateIndividualWinPercentage(wins3, losses3);
            var winPct4 = standings.calculateIndividualWinPercentage(wins4, losses4);

            expect(winPct1).to.equal("0.480");
            expect(winPct2).to.equal("0.700");
            expect(winPct3).to.equal("0.200");
            expect(winPct4).to.equal("0.182");
        });
    });

    describe ("Tests for calculating all win percentages", function () {
        it ('should set the innerHTML for win percentage elements to the correct win percentage', function () {
            var wins1 = {
                innerHTML: "0"
            };
            var wins2 = {
                innerHTML: "5"
            };
            var wins3 = {
                innerHTML: "0"
            };
            var wins4 = {
                innerHTML: "10"
            };
            var wins5 = {
                innerHTML: "9"
            };
            var wins6 = {
                innerHTML: "16"
            };
            var losses1 = {
                innerHTML: "0"
            };
            var losses2 = {
                innerHTML: "0"
            };
            var losses3 = {
                innerHTML: "6"
            };
            var losses4 = {
                innerHTML: "10"
            };
            var losses5 = {
                innerHTML: "13"
            };
            var losses6 = {
                innerHTML: "7"
            };
            var winsArray = [wins1, wins2, wins3, wins4, wins5, wins6];
            var lossesArray = [losses1, losses2, losses3, losses4, losses5, losses6];
            var winPctArray = [{}, {}, {}, {}, {}, {}];

            standings.calculateAllWinPercentages(winsArray, lossesArray, winPctArray);

            expect(winPctArray[0].innerHTML).to.equal("0.000");
            expect(winPctArray[1].innerHTML).to.equal("1.000");
            expect(winPctArray[2].innerHTML).to.equal("0.000");
            expect(winPctArray[3].innerHTML).to.equal("0.500");
            expect(winPctArray[4].innerHTML).to.equal("0.409");
            expect(winPctArray[5].innerHTML).to.equal("0.696");
        });
    });

    describe ("Test for formatting the number of games behind", function () {
        it ('should format the games behind correctly when the team is in first', function () {
            var gamesBehind = 0;

            var gamesBehindStr = standings.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal("-");
        });
        it ('should format the games behind correctly when the team has played one less game than the first place team', function () {
            var gamesBehind = 2.5;

            var gamesBehindStr = standings.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal("2.5");
        });
        it ('should format the games behind correctly when the team has played the same number of games as the first place team', function () {
            var gamesBehind = 5;

            var gamesBehindStr = standings.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal("5.0");
        });
        it ('should format the games behind correctly when the team is behind by double/triple digit games', function () {
            var gamesBehind1 = 22;
            var gamesBehind2 = 162;

            var gamesBehindStr1 = standings.formatGamesBehind(gamesBehind1);
            var gamesBehindStr2 = standings.formatGamesBehind(gamesBehind2);

            expect(gamesBehindStr1).to.equal("22.0");
            expect(gamesBehindStr2).to.equal("162.0");
        });
    });
});