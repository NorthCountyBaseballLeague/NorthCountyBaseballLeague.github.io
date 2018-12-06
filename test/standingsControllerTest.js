const expect = require('chai').expect;
const standingsControllerConstructor = require('../controllers/standingsController.js');
let standingsController;

describe('Standings Controller Test', function () {
    describe('Tests for calculating the number of wins and losses', () => {
        beforeEach(() => {
            standingsController = standingsControllerConstructor();
        });

        it('should calculate the correct number of wins and losses when nobody has played yet', () => {
            const schedule = [];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(schedule, teams);

            teams.forEach((team) => {
                for (let i = 0; i < 4; i++) {
                    expect(winsAndLosses[team][i]).to.equal(0);
                }
                expect(winsAndLosses[team][4]).to.equal('-');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses when the home team always wins', () => {
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'team2'
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(schedule, teams);

            teams.forEach((team) => {
                expect(winsAndLosses[team][0]).to.equal(2);
                expect(winsAndLosses[team][1]).to.equal(2);
                expect(winsAndLosses[team][2]).to.equal(2);
                expect(winsAndLosses[team][3]).to.equal(2);
                expect(winsAndLosses[team][5]).to.equal(1);
            });
            expect(winsAndLosses['team1'][4]).to.equal('L1');
            expect(winsAndLosses['team2'][4]).to.equal('W1');
        });
        it('should calculate the correct number of wins and losses when the away team always wins', () => {
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'team1'
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(schedule, teams);

            teams.forEach((team) => {
                expect(winsAndLosses[team][0]).to.equal(2);
                expect(winsAndLosses[team][1]).to.equal(2);
                expect(winsAndLosses[team][2]).to.equal(2);
                expect(winsAndLosses[team][3]).to.equal(2);
                expect(winsAndLosses[team][5]).to.equal(1);
            });
            expect(winsAndLosses['team1'][4]).to.equal('W1');
            expect(winsAndLosses['team2'][4]).to.equal('L1');
        });
        it('should calculate the correct number of wins and losses when the game is pending', () => {
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'pending'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'pending'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'pending'
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    winner: 'pending'
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(schedule, teams);

            teams.forEach((team) => {
                expect(winsAndLosses[team][0]).to.equal(0);
                expect(winsAndLosses[team][1]).to.equal(0);
                expect(winsAndLosses[team][2]).to.equal(0);
                expect(winsAndLosses[team][3]).to.equal(0);
                expect(winsAndLosses[team][4]).to.equal('-');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses when a team has a bye', () => {
            const schedule = [
                {
                    visitors: 'team1',
                    home: '',
                    winner: ''
                },
                {
                    visitors: 'team2',
                    home: '',
                    winner: ''
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(schedule, teams);

            teams.forEach((team) => {
                expect(winsAndLosses[team][0]).to.equal(0);
                expect(winsAndLosses[team][1]).to.equal(0);
                expect(winsAndLosses[team][2]).to.equal(0);
                expect(winsAndLosses[team][3]).to.equal(0);
                expect(winsAndLosses[team][4]).to.equal('-');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses for any number of teams', () => {
            const team1 = {
                innerHTML: 'team1'
            };
            const team2 = {
                innerHTML: 'team2'
            };
            const team3 = {
                innerHTML: 'team3'
            };
            const team4 = {
                innerHTML: 'team4'
            };
            const team5 = {
                innerHTML: 'team5'
            };
            const winnersArray = [team2, team1, team4, team3, team2, team5, team1,
                team1, team3, team2];
            const awayTeamArray = [team2, team1, team3, team3, team2, team1, team2,
                team4, team3, team2];
            const homeTeamArray = [team1, team5, team4, team2, team4, team5, team1,
                team1, team2, team5];
            const teams = ['team1', 'team2', 'team3', 'team4', 'team5'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(winnersArray,
                awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses['team1'][0]).to.equal(3);
            expect(winsAndLosses['team1'][1]).to.equal(2);
            expect(winsAndLosses['team2'][0]).to.equal(3);
            expect(winsAndLosses['team2'][1]).to.equal(3);
            expect(winsAndLosses['team3'][0]).to.equal(2);
            expect(winsAndLosses['team3'][1]).to.equal(1);
            expect(winsAndLosses['team4'][0]).to.equal(1);
            expect(winsAndLosses['team4'][1]).to.equal(2);
            expect(winsAndLosses['team5'][0]).to.equal(1);
            expect(winsAndLosses['team5'][1]).to.equal(2);
        });
        it('should calculate the last 10 games record when more than 10 games have been played', () => {
            const team1 = {
                innerHTML: 'team1'
            };
            const team2 = {
                innerHTML: 'team2'
            };
            const winnersArray = [team2, team1, team2, team2, team1, team1, team1,
                team1, team2, team2, team1];
            const awayTeamArray = [team2, team2, team2, team2, team2, team2, team2,
                team2, team2, team2, team2];
            const homeTeamArray = [team1, team1, team1, team1, team1, team1, team1,
                team1, team1, team1, team1];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(winnersArray,
                awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses['team1'][2]).to.equal(6);
            expect(winsAndLosses['team1'][3]).to.equal(4);
            expect(winsAndLosses['team2'][2]).to.equal(4);
            expect(winsAndLosses['team2'][3]).to.equal(6);
        });
        it('should calculate the win/loss streak of each team', () => {
            const team1 = {
                innerHTML: 'team1'
            };
            const team2 = {
                innerHTML: 'team2'
            };
            const winnersArray = [team2, team1, team2, team2, team1, team1, team1];
            const awayTeamArray = [team2, team2, team2, team2, team2, team2, team2];
            const homeTeamArray = [team1, team1, team1, team1, team1, team1, team1];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsAndLosses(winnersArray,
                awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses['team1'][4]).to.equal('W3');
            expect(winsAndLosses['team1'][5]).to.equal(3);
            expect(winsAndLosses['team2'][4]).to.equal('L3');
            expect(winsAndLosses['team2'][5]).to.equal(3);
        });
    });

    describe ('Tests for formatting the win percentage', function () {
        it ('should format the win percentage correctly when a team has 0 wins', function () {
            var winPct = 0;

            var winPctStr = standingsController.formatWinPercentage(winPct);

            expect(winPctStr).to.equal('0.000');
        });
        it ('should format the win percentage correctly when a team has 0 losses', function () {
            var winPct = 1;

            var winPctStr = standingsController.formatWinPercentage(winPct);

            expect(winPctStr).to.equal('1.000');
        });
        it ('should format the win percentage correctly when a team has equal wins and losses', function () {
            var winPct = 0.5;

            var winPctStr = standingsController.formatWinPercentage(winPct);

            expect(winPctStr).to.equal('0.500');
        });
        it ('should format the win percentage correctly when a team has unequal wins and losses', function () {
            var winPct1 = 0.25;
            var winPct2 = 0.75;
            var winPct3 = 0.542;
            var winPct4 = 0.017;

            var winPctStr1 = standingsController.formatWinPercentage(winPct1);
            var winPctStr2 = standingsController.formatWinPercentage(winPct2);
            var winPctStr3 = standingsController.formatWinPercentage(winPct3);
            var winPctStr4 = standingsController.formatWinPercentage(winPct4);

            expect(winPctStr1).to.equal('0.250');
            expect(winPctStr2).to.equal('0.750');
            expect(winPctStr3).to.equal('0.542');
            expect(winPctStr4).to.equal('0.017');
        });
    });

    describe('Tests for calculating individual win percentage', function () {
        it ('should return the correct win percentage when a team has not played any games', function () {
            var wins = 0;
            var losses = 0;

            var winPct = standingsController.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal('0.000');
        });
        it ('should return the correct win percentage when a team has no wins', function () {
            var wins = 0;
            var losses = 10;

            var winPct = standingsController.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal('0.000');
        });
        it ('should return the correct win percentage when a team has no losses', function () {
            var wins = 8;
            var losses = 0;

            var winPct = standingsController.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal('1.000');
        });
        it ('should return the correct win percentage when a team has equal number of wins and losses', function () {
            var wins = 5;
            var losses = 5;

            var winPct = standingsController.calculateIndividualWinPercentage(wins, losses);

            expect(winPct).to.equal('0.500');
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

            var winPct1 = standingsController.calculateIndividualWinPercentage(wins1, losses1);
            var winPct2 = standingsController.calculateIndividualWinPercentage(wins2, losses2);
            var winPct3 = standingsController.calculateIndividualWinPercentage(wins3, losses3);
            var winPct4 = standingsController.calculateIndividualWinPercentage(wins4, losses4);

            expect(winPct1).to.equal('0.480');
            expect(winPct2).to.equal('0.700');
            expect(winPct3).to.equal('0.200');
            expect(winPct4).to.equal('0.182');
        });
    });

    describe ('Tests for calculating all win percentages', function () {
        it ('should set the innerHTML for win percentage elements to the correct win percentage', function () {
            var wins1 = {
                innerHTML: '0'
            };
            var wins2 = {
                innerHTML: '5'
            };
            var wins3 = {
                innerHTML: '0'
            };
            var wins4 = {
                innerHTML: '10'
            };
            var wins5 = {
                innerHTML: '9'
            };
            var wins6 = {
                innerHTML: '16'
            };
            var losses1 = {
                innerHTML: '0'
            };
            var losses2 = {
                innerHTML: '0'
            };
            var losses3 = {
                innerHTML: '6'
            };
            var losses4 = {
                innerHTML: '10'
            };
            var losses5 = {
                innerHTML: '13'
            };
            var losses6 = {
                innerHTML: '7'
            };
            var winsArray = [wins1, wins2, wins3, wins4, wins5, wins6];
            var lossesArray = [losses1, losses2, losses3, losses4, losses5, losses6];
            var winPctArray = [{}, {}, {}, {}, {}, {}];

            standingsController.calculateAllWinPercentages(winsArray, lossesArray, winPctArray);

            expect(winPctArray[0].innerHTML).to.equal('0.000');
            expect(winPctArray[1].innerHTML).to.equal('1.000');
            expect(winPctArray[2].innerHTML).to.equal('0.000');
            expect(winPctArray[3].innerHTML).to.equal('0.500');
            expect(winPctArray[4].innerHTML).to.equal('0.409');
            expect(winPctArray[5].innerHTML).to.equal('0.696');
        });
    });

    describe ('Test for formatting the number of games behind', function () {
        it ('should format the games behind correctly when the team is in first', function () {
            var gamesBehind = 0;

            var gamesBehindStr = standingsController.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal('-');
        });
        it ('should format the games behind correctly when the team has played one less game than the first place team', function () {
            var gamesBehind = 2.5;

            var gamesBehindStr = standingsController.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal('2.5');
        });
        it ('should format the games behind correctly when the team has played the same number of games as the first place team', function () {
            var gamesBehind = 5;

            var gamesBehindStr = standingsController.formatGamesBehind(gamesBehind);

            expect(gamesBehindStr).to.equal('5.0');
        });
        it ('should format the games behind correctly when the team is behind by double/triple digit games', function () {
            var gamesBehind1 = 22;
            var gamesBehind2 = 162;

            var gamesBehindStr1 = standingsController.formatGamesBehind(gamesBehind1);
            var gamesBehindStr2 = standingsController.formatGamesBehind(gamesBehind2);

            expect(gamesBehindStr1).to.equal('22.0');
            expect(gamesBehindStr2).to.equal('162.0');
        });
    });
});