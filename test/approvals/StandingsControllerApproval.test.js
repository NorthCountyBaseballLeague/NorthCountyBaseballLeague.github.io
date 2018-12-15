require('approvals').mocha();
const standingsControllerConstructor = require('../../controllers/standingsController');
let standingsController;

describe('Standings Controller Approvals Tests', () => {
    describe('buildStandings', () => {
        let teams;
        let standings;
        let standingsBody;
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
            standingsController = standingsControllerConstructor();

            standingsBody = document.createElement();
        });

        it('should create an empty standings table when the teams are empty', function() {
            teams = [];
            standings = {};

            standingsController.buildStandings(teams, standings, standingsBody, document);

            this.verifyAsJSON(standingsBody, {
                reporters: ['beyondcompare']
            });
        })

        it('should populate the entire schedule', function() {
            teams = ['team1', 'team2'];
            standings = { 
                'team1': [6, 5, 6, 4, 'W1', 1, '0.545', '-', '6-4'],
                'team2': [5, 6, 4, 6, 'L1', 1, '0.455', '1.0', '4-6']
            };

            standingsController.buildStandings(teams, standings, standingsBody, document);

            this.verifyAsJSON(standingsBody, {
                reporters: ['beyondcompare']
            });
        });
    });
});