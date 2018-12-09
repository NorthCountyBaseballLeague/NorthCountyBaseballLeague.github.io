const { expect } = require('chai');
const scheduleControllerConstructor = require('../controllers/scheduleController');
let scheduleController;

describe('Schedule Controller Test', () => {
    describe('getSchedule', () => {
        let schedule;

        beforeEach(() => {
            schedule = [
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
        
            const schedulesFilebase = {
                '15hello': {
                    teams: ['team1', 'team2'],
                    schedule
                }
            };
            scheduleController = scheduleControllerConstructor(schedulesFilebase);
        });

        it('should get the entire standings with everything calculated and the order of the teams', () => {
            const result = scheduleController.getSchedule('15hello');

            expect(JSON.stringify(result)).to.equal(JSON.stringify(schedule));
        });
        
        it('should return an empty object when the season does not exist in the filebase', () => {
            const expected = {};
            
            const result = scheduleController.getSchedule('20hellno');

            expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
        });
    });

    describe('addDelaysToWeeks', () => {
        beforeEach(() => {
            scheduleController = scheduleControllerConstructor();
        });

        it('should add a one week delay to each week', () => {
            const game1 = {
                date: '1/1/2018'
            };
            const game2 = {
                date: '1/2/2018'
            };
            const game3 = {
                date: '1/3/2018'
            };
            const game4 = {
                date: '1/4/2018'
            };
            const game5 = {
                date: '1/5/2018'
            };
            const schedule = [game1, game2, game3, game4, game5];

            scheduleController.addDelaysToWeeks(schedule, '1/1/2018');

            expect(game1.date).to.equal('1/8/2018');
            expect(game2.date).to.equal('1/9/2018');
            expect(game3.date).to.equal('1/10/2018');
            expect(game4.date).to.equal('1/11/2018');
            expect(game5.date).to.equal('1/12/2018');
        });
        it('should add a week delay when the game comes at the end of a month', () => {
            const game1 = {
                date: '1/31/2018'
            };
            const game2 = {
                date: '2/28/2018'
            };
            const game3 = {
                date: '2/28/2016'
            };
            const game4 = {
                date: '4/30/2018'
            };
            const game5 = {
                date: '6/24/2018'
            };
            const schedule = [game1, game2, game3, game4, game5];

            scheduleController.addDelaysToWeeks(schedule, '2/25/2016');

            expect(game1.date).to.equal('2/7/2018');
            expect(game2.date).to.equal('3/7/2018');
            expect(game3.date).to.equal('3/6/2016');
            expect(game4.date).to.equal('5/7/2018');
            expect(game5.date).to.equal('7/1/2018');
        });
        it('should add a week delay when the game comes at the end of a year', () => {
            const game1 = {
                date: '12/25/2018'
            };
            const game2 = {
                date: '12/30/2018'
            };
            const game3 = {
                date: '12/31/2018'
            };

            const schedule = [game1, game2, game3];

            scheduleController.addDelaysToWeeks(schedule, '11/30/2018');

            expect(game1.date).to.equal('1/1/2019');
            expect(game2.date).to.equal('1/6/2019');
            expect(game3.date).to.equal('1/7/2019');
        });
        it('should not add a delay when the game comes before the game to delay from', () => {
            const game1 = {
                date: '12/25/2018'
            };
            const game2 = {
                date: '1/30/2019'
            };
            const game3 = {
                date: '2/5/2019'
            };
            const schedule = [game1, game2, game3];

            scheduleController.addDelaysToWeeks(schedule, '2/20/2019');

            expect(game1.date).to.equal('12/25/2018');
            expect(game2.date).to.equal('1/30/2019');
            expect(game3.date).to.equal('2/5/2019');
        });
    });
});
