const { expect } = require('chai');
const scoresControllerConstructor = require('../controllers/scoresController');
let scoresController;

describe('Scores Controller Test', () => {
    describe('getScores', () => {
        let schedule;

        beforeEach(() => {
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
                }
            ];
        
            const schedulesFilebase = {
                '15hello': {
                    teams: ['team1', 'team2'],
                    schedule
                }
            };
            scoresController = scoresControllerConstructor(schedulesFilebase);
        });

        it('should get the entire standings when the season exists in the filebase', () => {
            scoresController.getScores('15hello');

            expect(JSON.stringify(scoresController.schedule)).to.equal(JSON.stringify(schedule));
        });
        
        it('should return an empty object when the season does not exist in the filebase', () => {
            const expected = {};
            
            scoresController.getScores('20hellno');

            expect(JSON.stringify(scoresController.schedule)).to.equal(JSON.stringify(expected));
        });
    });

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
                }
            ];

            const schedulesFilebase = {
                '15hello': {
                    teams: ['team1', 'team2'],
                    schedule
                }
            };
            scoresController = scoresControllerConstructor(schedulesFilebase);
            scoresController.getScores('15hello');
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

    describe('didTeam1Win', () => {
        beforeEach(() => {
            scoresController = scoresControllerConstructor();
        });

        it('should return true when team1 won the game', () => {
            const team1Score = 12;
            const team2Score = 3;

            const result = scoresController.didTeam1Win(team1Score, team2Score);

            expect(result).to.equal(true);
        });

        it('should return false when team2 won the game', () => {
            const team1Score = 5;
            const team2Score = 7;

            const result = scoresController.didTeam1Win(team1Score, team2Score);

            expect(result).to.equal(false);
        });
    });

    describe('teamWithMoreWins', () => {
        let scoresArray;

        beforeEach(function() {
            scoresArray = [
                {
                    'team1': 1,
                    'team2': 5
                },
                {
                    'team1': 4,
                    'team2': 3
                },
                {
                    'team1': 2,
                    'team2': 4
                }
            ];

            scoresController = scoresControllerConstructor();
        });

        it('should return to team that has more wins in an array', () => {
            const expected = 'team2';

            const result = scoresController.teamWithMoreWins(scoresArray);

            expect(result).to.equal(expected);
        });

        it('should return the team with the most runs when each team has the same amount of wins', () => {
            scoresArray.push({
                'team1': 5,
                'team2': 4
            })
            const expected = 'team2';

            const result = scoresController.teamWithMoreWins(scoresArray);

            expect(result).to.equal(expected);
        });

        it('should return the first team when each team has the same amount of wins and total runs', () => {
            scoresArray.push({
                'team1': 5,
                'team2': 0
            })
            const expected = 'team1';

            const result = scoresController.teamWithMoreWins(scoresArray);

            expect(result).to.equal(expected);
        });
    });
});