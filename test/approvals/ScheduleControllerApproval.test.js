require('approvals').mocha();
const scheduleControllerConstructor = require('../../controllers/scheduleController');
let scheduleController;

describe('Schedule Controller Approvals Tests', () => {
    describe('buildSchedule', () => {
        let schedule;
        let scheduleBody;
        const document = {
            createElement: function() {
                return {
                    children: [],
                    appendChild: function(child) {
                        this.children.push(child);
                    },
                    classList: {
                        classes: [],
                        add: function(classToAdd) {
                            this.classes.push(classToAdd);
                        }
                    }
                }
            },
            createTextNode: function(text) {
                return {
                    text: text
                };
            }
        }

        beforeEach(() => {
            scheduleController = scheduleControllerConstructor();

            scheduleBody = document.createElement();
        });

        it('should create an empty schedule when there is no schedule', function() {
            schedule = [];

            scheduleController.buildSchedule(schedule, scheduleBody, document);

            this.verifyAsJSON(scheduleBody, {
                reporters: ['beyondcompare']
            });
        })

        it('should populate the entire schedule', function() {
            schedule = [
                {
                    date: '11/22/18',
                    time: '6 PM',
                    visitors: 'team2',
                    home: 'team1',
                    field: 'OG',
                    winner: 'team2'
                },
                {
                    date: '11/22/18',
                    time: '5 PM',
                    visitors: 'ALL STAR GAME',
                    home: '',
                    field: 'Pauma',
                    winner: ''
                },
                {
                    date: '4/6/17',
                    time: '11 PM',
                    visitors: 'team1',
                    home: 'team4',
                    field: 'VC',
                    winner: 'team1'
                },
                {
                    date: '4/6/17',
                    time: '10 AM',
                    visitors: 'team3',
                    home: 'team2',
                    field: 'OG',
                    winner: 'team3'
                }
            ];

            scheduleController.buildSchedule(schedule, scheduleBody, document);

            this.verifyAsJSON(scheduleBody, {
                reporters: ['beyondcompare']
            });
        });
    });
});