require('approvals').mocha();
const scoresControllerConstructor = require('../../controllers/scoresController');
let scoresController;

describe('Scores Controller Approvals Tests', () => {
    describe('buildScores', () => {
        let dateSelector;
        let scoresTables;
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
            scoresController = scoresControllerConstructor();

            dateSelector = document.createElement();
            scoresTables = document.createElement();
            scoresTables.appendChild(dateSelector);
        });

        it('should not create any scores table when the schedule is empty', function() {
            scoresController.schedule = [];

            scoresController.buildScores(dateSelector, scoresTables, document);

            this.verifyAsJSON(scoresTables, {
                reporters: ['beyondcompare']
            });
        })

        it('should not create any scores table when there are no scores', function() {
            scoresController.schedule = [
                {
                    date: '1/12/18',
                    visitors: 'team1',
                    home: 'team2'
                },
                { 
                    date: '1/12/18',
                    visitors: 'team2',
                    home: 'team1'
                }
            ];

            scoresController.buildScores(dateSelector, scoresTables, document);

            this.verifyAsJSON(scoresTables, {
                reporters: ['beyondcompare']
            });
        });

        it.only('should create the scores tables for the date when there are scores', function() {
            scoresController.schedule = [
                { 
                    date: '1/12/18',
                    visitors: 'team1',
                    home: 'team2',
                    visitorsScore: 5,
                    homeScore: 7

                },
                { 
                    date: '1/12/18',
                    visitors: 'team2',
                    home: 'team1',
                    visitorsScore: 10,
                    homeScore: 2
                }
            ];

            scoresController.buildScores(dateSelector, scoresTables, document);

            this.verifyAsJSON(scoresTables, {
                reporters: ['beyondcompare']
            });
        });
    });
});