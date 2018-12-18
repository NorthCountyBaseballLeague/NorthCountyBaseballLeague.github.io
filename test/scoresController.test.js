const { expect } = require('chai');
const scoresControllerConstructor = require('../controllers/scoresController');
let scoresController;

describe('Scores Controller Test', () => {
    describe('getScores', function() {
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
                    visitors: 'team2',
                    home: 'team1',
                    visitorsScore: 3,
                    homeScore: 10                
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    visitorsScore: 0,
                    homeScore: 7
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    visitorsScore: 9,
                    homeScore: 4
                },
            ];
        
            const schedulesFilebase = {
                '15hello': {
                    teams: ['team1', 'team2'],
                    schedule
                }
            };

            scoresController = scoresControllerConstructor(schedulesFilebase);
        });

        it('should return an empty object when the season does not exist in the filebase', function() {
            const expected = {};
            
            const result = scoresController.getScores('20hellno');

            expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
        });
    });
});