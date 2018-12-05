const { expect } = require('chai');
const scheduleController = require('../controllers/scheduleController');

describe('Schedule Controller Test', () => {
    describe('Tests for adding a delay to specific weeks', () => {
        it('should add a one week delay to each week', () => {
            const date1 = {
                innerHTML: '1/1/2018'
            };
            const date2 = {
                innerHTML: '1/2/2018'
            };
            const date3 = {
                innerHTML: '1/3/2018'
            };
            const date4 = {
                innerHTML: '1/4/2018'
            };
            const date5 = {
                innerHTML: '1/5/2018'
            };
            const datesArr = [date1, date2, date3, date4, date5];

            scheduleController.addDelaysToWeeks(datesArr, '1/1/2018');

            expect(date1.innerHTML).to.equal('1/8/2018');
            expect(date2.innerHTML).to.equal('1/9/2018');
            expect(date3.innerHTML).to.equal('1/10/2018');
            expect(date4.innerHTML).to.equal('1/11/2018');
            expect(date5.innerHTML).to.equal('1/12/2018');
        });
        it('should add a week delay when the date comes at the end of a month', () => {
            const date1 = {
                innerHTML: '1/31/2018'
            };
            const date2 = {
                innerHTML: '2/28/2018'
            };
            const date3 = {
                innerHTML: '2/28/2016'
            };
            const date4 = {
                innerHTML: '4/30/2018'
            };
            const date5 = {
                innerHTML: '6/24/2018'
            };
            const datesArr = [date1, date2, date3, date4, date5];

            scheduleController.addDelaysToWeeks(datesArr, '2/25/2016');

            expect(date1.innerHTML).to.equal('2/7/2018');
            expect(date2.innerHTML).to.equal('3/7/2018');
            expect(date3.innerHTML).to.equal('3/6/2016');
            expect(date4.innerHTML).to.equal('5/7/2018');
            expect(date5.innerHTML).to.equal('7/1/2018');
        });
        it('should add a week delay when the date comes at the end of a year', () => {
            const date1 = {
                innerHTML: '12/25/2018'
            };
            const date2 = {
                innerHTML: '12/30/2018'
            };
            const date3 = {
                innerHTML: '12/31/2018'
            };

            const datesArr = [date1, date2, date3];

            scheduleController.addDelaysToWeeks(datesArr, '11/30/2018');

            expect(date1.innerHTML).to.equal('1/1/2019');
            expect(date2.innerHTML).to.equal('1/6/2019');
            expect(date3.innerHTML).to.equal('1/7/2019');
        });
        it('should not add a delay when the date comes before the date to delay from', () => {
            const date1 = {
                innerHTML: '12/25/2018'
            };
            const date2 = {
                innerHTML: '1/30/2019'
            };
            const date3 = {
                innerHTML: '2/5/2019'
            };
            const datesArr = [date1, date2, date3];

            scheduleController.addDelaysToWeeks(datesArr, '2/20/2019');

            expect(date1.innerHTML).to.equal('12/25/2018');
            expect(date2.innerHTML).to.equal('1/30/2019');
            expect(date3.innerHTML).to.equal('2/5/2019');
        });
    });
});
