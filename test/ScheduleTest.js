var expect = require('chai').expect;
var schedule = require('../js/Schedule');

describe ("Schedule Test", function () {
    describe ("Tests for calculating the number of wins and losses", function () {
        it ('should calculate the correct number of wins and losses when nobody has played yet', function () {
            var winnersArray = [];
            var awayTeamArray = [];
            var homeTeamArray = [];
            var teams = ["team1", "team2"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            for (var i = 0; i < 2; i++) {
                teams.forEach(team => {
                    expect(winsAndLosses[i][team]).to.equal(0);
                });
            }
        });
        it ('should calculate the correct number of wins and losses when the home team always wins', function () {
            var team1 = {
                innerHTML : "team1"
            };
            var team2 = {
                innerHTML : "team2"
            };
            var winnersArray = [team1, team2, team1, team2];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[0][team]).to.equal(2);
                expect(winsAndLosses[1][team]).to.equal(2);
            });
        });
        it ('should calculate the correct number of wins and losses when the away team always wins', function () {
            var team1 = {
                innerHTML : "team1"
            };
            var team2 = {
                innerHTML : "team2"
            };
            var winnersArray = [team2, team1, team2, team1];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[0][team]).to.equal(2);
                expect(winsAndLosses[1][team]).to.equal(2);
            });
        });
        it ('should calculate the correct number of wins and losses when the game is pending', function () {
            var team1 = {
                innerHTML : "team1"
            };
            var team2 = {
                innerHTML : "team2"
            };
            var pending = {
                innerHTML : "pending"
            };
            var winnersArray = [pending, pending, pending, pending];
            var awayTeamArray = [team2, team1, team2, team1];
            var homeTeamArray = [team1, team2, team1, team2];
            var teams = ["team1", "team2"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            teams.forEach(team => {
                expect(winsAndLosses[0][team]).to.equal(0);
                expect(winsAndLosses[1][team]).to.equal(0);
            });
        });
        it ('should calculate the correct number of wins and losses for any number of teams', function () {
            var team1 = {
                innerHTML : "team1"
            };
            var team2 = {
                innerHTML : "team2"
            };
            var team3 = {
                innerHTML : "team3"
            };
            var team4 = {
                innerHTML : "team4"
            };
            var team5 = {
                innerHTML : "team5"
            };
            var winnersArray = [team2, team1, team4, team3, team2, team5, team1, team1, team3, team2];
            var awayTeamArray = [team2, team1, team3, team3, team2, team1, team2, team4, team3, team2];
            var homeTeamArray = [team1, team5, team4, team2, team4, team5, team1, team1, team2, team5];
            var teams = ["team1", "team2", "team3", "team4", "team5"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            expect(winsAndLosses[0]["team1"]).to.equal(3);
            expect(winsAndLosses[1]["team1"]).to.equal(2);
            expect(winsAndLosses[0]["team2"]).to.equal(3);
            expect(winsAndLosses[1]["team2"]).to.equal(3);
            expect(winsAndLosses[0]["team3"]).to.equal(2);
            expect(winsAndLosses[1]["team3"]).to.equal(1);
            expect(winsAndLosses[0]["team4"]).to.equal(1);
            expect(winsAndLosses[1]["team4"]).to.equal(2);
            expect(winsAndLosses[0]["team5"]).to.equal(1);
            expect(winsAndLosses[1]["team5"]).to.equal(2);
        });
    });

    describe ("Tests for constructing a counter for the number of wins/losses", function () {
        it ('should construct an empty object when there are no teams', function () {
            var teams = [];

            var counter = schedule.constructCounter(teams);

            expect(Object.keys(counter).length).to.equal(0);
        });
        it ('should construct an object with values set to 0 when there are teams', function () {
            var teams = ["team1", "team2", "team3"];

            var counter = schedule.constructCounter(teams);

            expect(Object.keys(counter).length).to.equal(3);
            teams.forEach(function (team) {
                expect(counter[team]).to.equal(0);
            });
        });
    });
});