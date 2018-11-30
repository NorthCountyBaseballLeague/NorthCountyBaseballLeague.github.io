var expect = require('chai').expect;
var scheduleController = require('../controllers/scheduleController');

describe("Schedule Controller Test", function () {
    describe("Tests for calculating the number of wins and losses", function () {
        it('should calculate the correct number of wins and losses when nobody has played yet', function () {
            var winnersArray = [];
            var awayTeamArray = [];
            var homeTeamArray = [];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                for (var i = 0; i < 4; i++) {
                    expect(winsAndLosses[team][i]).to.equal(0);
                }
                expect(winsAndLosses[team][4]).to.equal('');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses when the home team always wins', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var winnersArray = [team1, team2, team1, team2];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[team][0]).to.equal(2);
                expect(winsAndLosses[team][1]).to.equal(2);
                expect(winsAndLosses[team][2]).to.equal(2);
                expect(winsAndLosses[team][3]).to.equal(2);
            });
        });
        it('should calculate the correct number of wins and losses when the away team always wins', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var winnersArray = [team2, team1, team2, team1];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[team][0]).to.equal(2);
                expect(winsAndLosses[team][1]).to.equal(2);
                expect(winsAndLosses[team][2]).to.equal(2);
                expect(winsAndLosses[team][3]).to.equal(2);
            });
        });
        it('should calculate the correct number of wins and losses when the game is pending', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var pending = {
                innerHTML: "pending"
            };
            var winnersArray = [pending, pending, pending, pending];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[team][0]).to.equal(0);
                expect(winsAndLosses[team][1]).to.equal(0);
                expect(winsAndLosses[team][2]).to.equal(0);
                expect(winsAndLosses[team][3]).to.equal(0);
                expect(winsAndLosses[team][4]).to.equal('');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses when a team has a bye', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var bye = {
                innerHTML: ""
            };
            var winnersArray = [bye, bye];
            var awayTeamArray = [team1, team2];
            var homeTeamArray = [bye, bye];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[team][0]).to.equal(0);
                expect(winsAndLosses[team][1]).to.equal(0);
                expect(winsAndLosses[team][2]).to.equal(0);
                expect(winsAndLosses[team][3]).to.equal(0);
                expect(winsAndLosses[team][4]).to.equal('');
                expect(winsAndLosses[team][5]).to.equal(0);
            });
        });
        it('should calculate the correct number of wins and losses for any number of teams', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var team3 = {
                innerHTML: "team3"
            };
            var team4 = {
                innerHTML: "team4"
            };
            var team5 = {
                innerHTML: "team5"
            };
            var winnersArray = [team2, team1, team4, team3, team2, team5, team1, team1, team3, team2];
            var awayTeamArray = [team2, team1, team3, team3, team2, team1, team2, team4, team3, team2];
            var homeTeamArray = [team1, team5, team4, team2, team4, team5, team1, team1, team2, team5];
            var teams = ["team1", "team2", "team3", "team4", "team5"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses["team1"][0]).to.equal(3);
            expect(winsAndLosses["team1"][1]).to.equal(2);
            expect(winsAndLosses["team2"][0]).to.equal(3);
            expect(winsAndLosses["team2"][1]).to.equal(3);
            expect(winsAndLosses["team3"][0]).to.equal(2);
            expect(winsAndLosses["team3"][1]).to.equal(1);
            expect(winsAndLosses["team4"][0]).to.equal(1);
            expect(winsAndLosses["team4"][1]).to.equal(2);
            expect(winsAndLosses["team5"][0]).to.equal(1);
            expect(winsAndLosses["team5"][1]).to.equal(2);
        });
        it('should calculate the last 10 games record when more than 10 games have been played', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var winnersArray = [team2, team1, team2, team2, team1, team1, team1, team1, team2, team2, team1];
            var awayTeamArray = [team2, team2, team2, team2, team2, team2, team2, team2, team2, team2, team2];
            var homeTeamArray = [team1, team1, team1, team1, team1, team1, team1, team1, team1, team1, team1];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses["team1"][2]).to.equal(6);
            expect(winsAndLosses["team1"][3]).to.equal(4);
            expect(winsAndLosses["team2"][2]).to.equal(4);
            expect(winsAndLosses["team2"][3]).to.equal(6);
        });
        it('should calculate the win/loss streak of each team', function () {
            var team1 = {
                innerHTML: "team1"
            };
            var team2 = {
                innerHTML: "team2"
            };
            var winnersArray = [team2, team1, team2, team2, team1, team1, team1];
            var awayTeamArray = [team2, team2, team2, team2, team2, team2, team2];
            var homeTeamArray = [team1, team1, team1, team1, team1, team1, team1];
            var teams = ["team1", "team2"];

            var winsAndLosses = scheduleController.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses["team1"][4]).to.equal('W3');
            expect(winsAndLosses["team1"][5]).to.equal(3);
            expect(winsAndLosses["team2"][4]).to.equal('L3');
            expect(winsAndLosses["team2"][5]).to.equal(3);
        });
    });

    describe("Tests for constructing a counter for the number of wins/losses", function () {
        it('should construct an empty object when there are no teams', function () {
            var teams = [];

            var counter = scheduleController.constructRecordCounter(teams);

            expect(Object.keys(counter).length).to.equal(0);
        });
        it('should construct an object with values set to 0 when there are teams', function () {
            var teams = ["team1", "team2", "team3"];

            var counter = scheduleController.constructRecordCounter(teams);

            expect(Object.keys(counter).length).to.equal(3);
            teams.forEach(function (team) {
                expect(counter[team].length).to.equal(6);
                expect(counter[team][0]).to.equal(0);
                expect(counter[team][1]).to.equal(0);
                expect(counter[team][2]).to.equal(0);
                expect(counter[team][3]).to.equal(0);
                expect(counter[team][4]).to.equal('');
                expect(counter[team][5]).to.equal(0);
            });
        });
    });

    describe("Tests for adding a delay to specific weeks", function () {
        it('should add a one week delay to each week', function () {
            var date1 = {
                innerHTML: '1/1/2018'
            }
            var date2 = {
                innerHTML: '1/2/2018'
            }
            var date3 = {
                innerHTML: '1/3/2018'
            }
            var date4 = {
                innerHTML: '1/4/2018'
            }
            var date5 = {
                innerHTML: '1/5/2018'
            }
            var datesArr = [date1, date2, date3, date4, date5];

            scheduleController.addDelaysToWeeks(datesArr, '1/1/2018');

            expect(date1.innerHTML).to.equal('1/8/2018');
            expect(date2.innerHTML).to.equal('1/9/2018');
            expect(date3.innerHTML).to.equal('1/10/2018');
            expect(date4.innerHTML).to.equal('1/11/2018');
            expect(date5.innerHTML).to.equal('1/12/2018');
        });
        it('should add a week delay when the date comes at the end of a month', function () {
            var date1 = {
                innerHTML: '1/31/2018'
            }
            var date2 = {
                innerHTML: '2/28/2018'
            }
            var date3 = {
                innerHTML: '2/28/2016'
            }
            var date4 = {
                innerHTML: '4/30/2018'
            }
            var date5 = {
                innerHTML: '6/24/2018'
            }
            var datesArr = [date1, date2, date3, date4, date5];

            scheduleController.addDelaysToWeeks(datesArr, '2/25/2016');

            expect(date1.innerHTML).to.equal('2/7/2018');
            expect(date2.innerHTML).to.equal('3/7/2018');
            expect(date3.innerHTML).to.equal('3/6/2016');
            expect(date4.innerHTML).to.equal('5/7/2018');
            expect(date5.innerHTML).to.equal('7/1/2018');
        });
        it('should add a week delay when the date comes at the end of a year', function () {
            var date1 = {
                innerHTML: '12/25/2018'
            }
            var date2 = {
                innerHTML: '12/30/2018'
            }
            var date3 = {
                innerHTML: '12/31/2018'
            }

            var datesArr = [date1, date2, date3];

            scheduleController.addDelaysToWeeks(datesArr, '11/30/2018');

            expect(date1.innerHTML).to.equal('1/1/2019');
            expect(date2.innerHTML).to.equal('1/6/2019');
            expect(date3.innerHTML).to.equal('1/7/2019');
        });
        it('should not add a delay when the date comes before the date to delay from', function () {
            var date1 = {
                innerHTML: '12/25/2018'
            }
            var date2 = {
                innerHTML: '1/30/2019'
            }
            var date3 = {
                innerHTML: '2/5/2019'
            }
            var datesArr = [date1, date2, date3];

            scheduleController.addDelaysToWeeks(datesArr, '2/20/2019');

            expect(date1.innerHTML).to.equal('12/25/2018');
            expect(date2.innerHTML).to.equal('1/30/2019');
            expect(date3.innerHTML).to.equal('2/5/2019');
        });
    });
});