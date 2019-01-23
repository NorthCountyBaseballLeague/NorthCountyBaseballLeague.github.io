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
                    visitors: 'team1',
                    home: 'team2'
                },
                { 
                    visitors: 'team2',
                    home: 'team1'
                }
            ];

            scoresController.buildScores(dateSelector, scoresTables, document);

            this.verifyAsJSON(scoresTables, {
                reporters: ['beyondcompare']
            });
        });

        it('should create the scores tables when there are scores', function() {
            scoresController.schedule = [
                { 
                    visitors: 'team1',
                    home: 'team2'
                },
                { 
                    visitors: 'team2',
                    home: 'team1'
                }
            ];

            scoresController.buildScores(dateSelector, scoresTables, document);

            this.verifyAsJSON(scoresTables, {
                reporters: ['beyondcompare']
            });
        });
    });
});