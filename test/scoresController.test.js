const { expect } = require('chai');
const scoresControllerConstructor = require('../controllers/scoresController');
let scoresController;

describe.only('Scores Controller Test', () => {
    describe('getScoresByTeams', function() {
        let schedule;

        beforeEach(function() {
            schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    visitorsScore: 5,
                    homeScore: 1
                },
                {
                    visitors: 'team1',
                    home: 'team2',
                    visitorsScore: 10,
                    homeScore: 3            
                },
                {
                    visitors: 'team2',
                    home: 'team1'
                },
            ];

            scoresController = scoresControllerConstructor(schedule);
        });

        it('should return an empty array when the two teams have not played each other', function() {
            const expected = [];
            
            const result = scoresController.getScoresByTeams('team3', 'team4');

            expect(result.length).to.equal(expected.length);
            for(let i = 0; i < result.length; i++) {
                expect(JSON.stringify(result[i])).to.equal(JSON.stringify(expected[i]));
            }
        });

        it('should return an array of all the scores that the teams played each other', function() {
            const expected = [
                {
                    'team1': schedule[0].homeScore,
                    'team2': schedule[0].visitorsScore
                },
                {
                    'team1': schedule[1].visitorsScore,
                    'team2': schedule[1].homeScore
                },
            ];
            
            const result = scoresController.getScoresByTeams('team1', 'team2');

            expect(result.length).to.equal(expected.length);
            for(let i = 0; i < result.length; i++) {
                expect(JSON.stringify(result[i])).to.equal(JSON.stringify(expected[i]));
            }        
        });
    });

    describe('getWinner', () => {

    });
});