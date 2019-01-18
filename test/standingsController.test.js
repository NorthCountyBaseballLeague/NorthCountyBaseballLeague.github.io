const expect = require('chai').expect;
const standingsControllerConstructor = require('../controllers/standingsController.js');
let standingsController;

describe('Standings Controller Test', () => {
    describe('getStandings', () => {
        beforeEach(() => {
            const schedulesFilebase = {
                '15hello': {
                    teams: ['team1', 'team2'],
                    schedule: [
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team2'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team2'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team2'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team2'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team2'
                        },
                        {
                            visitors: 'team2',
                            home: 'team1',
                            winner: 'team1'
                        }
                    ]
                }
            };
            standingsController = standingsControllerConstructor(schedulesFilebase);
        });

        it('should get the entire standings with everything calculated and the order of the teams', () => {
            const expectedStandings = {
                'team1': [6, 5, 6, 4, 'W1', 1, '0.545', '-', '6-4'],
                'team2': [5, 6, 4, 6, 'L1', 1, '0.455', '1.0', '4-6']
            };
            
            const { teams, standings } = standingsController.getStandings('15hello');

            expect(JSON.stringify(standings)).to.equal(JSON.stringify(expectedStandings));
            expect(teams[0]).to.equal('team1');
            expect(teams[1]).to.equal('team2');
        });
        
        it('should return an empty object when the season does not exist in the filebase', () => {
            const expected = {};
            
            const result = standingsController.getStandings('20hellno');

            expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
        });
    });

    describe('calculateWinsLossesAndStreak', () => {
        beforeEach(() => {
            standingsController = standingsControllerConstructor();
        });

        it('should calculate the correct number of wins and losses when nobody has played yet', () => {
            const schedule = [];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team1',
                    home: 'team5',
                    winner: 'team1'
                },
                {
                    visitors: 'team3',
                    home: 'team4',
                    winner: 'team4'
                },
                {
                    visitors: 'team3',
                    home: 'team2',
                    winner: 'team3'
                },
                {
                    visitors: 'team2',
                    home: 'team4',
                    winner: 'team2'
                },
                {
                    visitors: 'team1',
                    home: 'team5',
                    winner: 'team5'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team4',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team3',
                    home: 'team2',
                    winner: 'team3'
                },
                {
                    visitors: 'team2',
                    home: 'team5',
                    winner: 'team2'
                }
            ];
            const teams = ['team1', 'team2', 'team3', 'team4', 'team5'];

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

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
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

            expect(winsAndLosses['team1'][2]).to.equal(6);
            expect(winsAndLosses['team1'][3]).to.equal(4);
            expect(winsAndLosses['team2'][2]).to.equal(4);
            expect(winsAndLosses['team2'][3]).to.equal(6);
        });

        it('should calculate the win/loss streak of each team', () => {
            const schedule = [
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team2'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                },
                {
                    visitors: 'team2',
                    home: 'team1',
                    winner: 'team1'
                }
            ];
            const teams = ['team1', 'team2'];

            const winsAndLosses = standingsController.calculateWinsLossesAndStreak(schedule, teams);

            expect(winsAndLosses['team1'][4]).to.equal('W3');
            expect(winsAndLosses['team1'][5]).to.equal(3);
            expect(winsAndLosses['team2'][4]).to.equal('L3');
            expect(winsAndLosses['team2'][5]).to.equal(3);
        });
    });

    describe('calculateAllWinPercentages', () => {
        beforeEach(() => {
            standingsController = standingsControllerConstructor();
        });

        it ('should push the win percentage for each team into the standings object', () => {
            const standings = {
                'team1': [0, 0],
                'team2': [5, 0],
                'team3': [0, 6],
                'team4': [10, 10],
                'team5': [9, 13],
                'team6': [16, 7]
            };

            standingsController.calculateAllWinPercentages(standings);

            expect(standings['team1'][2]).to.equal('0.000');
            expect(standings['team2'][2]).to.equal('1.000');
            expect(standings['team3'][2]).to.equal('0.000');
            expect(standings['team4'][2]).to.equal('0.500');
            expect(standings['team5'][2]).to.equal('0.409');
            expect(standings['team6'][2]).to.equal('0.696');
        });
    });

    describe('sortStandings', () => {
        beforeEach(() => {
            const schedule = [
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
                    home: 'team1',
                    visitorsScore: 6,
                    homeScore: 4
                }
            ];
            const scoresController = {
                schedule: schedule
            };

            standingsController = standingsControllerConstructor(null, scoresController);
        });

        it ('should sort the standings correctly', () => {
            let standings = {
                'team1': [8, 11, 0, 0, 0, 0, '0.421'],
                'team2': [13, 6, 0, 0, 0, 0, '0.684'],
                'team3': [12, 7, 0, 0, 0, 0, '0.632'],
                'team4': [1, 18, 0, 0, 0, 0, '0.053'],
                'team5': [11, 9, 0, 0, 0, 0, '0.550'],
                'team6': [13, 7, 0, 0, 0, 0, '0.650']
            };
            const expectedStandings = {
                'team2': [13, 6, 0, 0, 0, 0, '0.684'],
                'team6': [13, 7, 0, 0, 0, 0, '0.650'],
                'team3': [12, 7, 0, 0, 0, 0, '0.632'],
                'team5': [11, 9, 0, 0, 0, 0, '0.550'],
                'team1': [8, 11, 0, 0, 0, 0, '0.421'],
                'team4': [1, 18, 0, 0, 0, 0, '0.053']
            };

            standings = standingsController.sortStandings(standings);
            
            expect(JSON.stringify(standings)).to.equal(JSON.stringify(expectedStandings));
        });

        it ('should sort the standings correctly when two teams have the same record', () => {
            let standings = {
                'team1': [8, 11, 0, 0, 0, 0, '0.421'],
                'team2': [13, 6, 0, 0, 0, 0, '0.421']
            };
            const expectedStandings = {
                'team2': [8, 11, 0, 0, 0, 0, '0.421'],
                'team1': [8, 11, 0, 0, 0, 0, '0.421'],
            };

            standings = standingsController.sortStandings(standings);
            
            expect(JSON.stringify(standings)).to.equal(JSON.stringify(expectedStandings));
        });
    });

    describe('calculateAllGamesBehind', () => {
        beforeEach(() => {
            standingsController = standingsControllerConstructor();
        });

        it ('should format the games behind correctly when the team is in first', () => {
            const standings = {
                'team2': [13, 6],
                'team6': [13, 7],
                'team3': [12, 7],
                'team5': [11, 9],
                'team1': [8, 11],
                'team4': [1, 18],
            };

            standingsController.calculateAllGamesBehind(standings);

            expect(standings['team1'][2]).to.equal('5.0');
            expect(standings['team2'][2]).to.equal('-');
            expect(standings['team3'][2]).to.equal('1.0');
            expect(standings['team4'][2]).to.equal('12.0');
            expect(standings['team5'][2]).to.equal('2.5');
            expect(standings['team6'][2]).to.equal('0.5');
        });
    });

    describe('formatLast10Games', () => {
        beforeEach(() => {
            standingsController = standingsControllerConstructor();
        });

        it ('should format the games behind correctly when the team is in first', () => {
            let standings = {
                'team1': [8, 11, 4, 6],
                'team2': [13, 6, 8, 2],
                'team3': [12, 7, 5, 5],
                'team4': [1, 18, 0, 10],
                'team5': [11, 9, 10, 0],
                'team6': [13, 7, 0, 0],
                'team7': [13, 7, 3, 2]
            };

            standingsController.formatLast10Games(standings);
            
            expect(standings['team1'][4]).to.equal('4-6');
            expect(standings['team2'][4]).to.equal('8-2');
            expect(standings['team3'][4]).to.equal('5-5');
            expect(standings['team4'][4]).to.equal('0-10');
            expect(standings['team5'][4]).to.equal('10-0');
            expect(standings['team6'][4]).to.equal('0-0');
            expect(standings['team7'][4]).to.equal('3-2');
        });
    });
});