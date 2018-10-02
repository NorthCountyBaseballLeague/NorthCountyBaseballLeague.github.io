var expect = require('chai').expect;
var schedule = require('../js/Schedule');

describe ("Schedule Test", function () {
    describe ("Tests for calculating the number of wins and losses", function () {
        it ('should calculate the correct number of wins and losses when nobody has played yet', function () {
            var winnersArray = [];
            var awayTeamArray = [];
            var homeTeamArray = [];
            teams = ["team1", "team2"];

            var winsAndLosses = schedule.calculateWinsAndLosses(winnersArray, awayTeamArray, homeTeamArray, teams);

            for (var i = 0; i < 2; i++) {
                teams.forEach(team => {
                    expect(winsAndLosses[i][team]).to.equal(0);
                });
            }
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