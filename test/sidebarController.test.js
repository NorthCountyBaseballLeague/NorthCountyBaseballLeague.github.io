const expect = require('chai').expect;
const sidebarControllerConstructor = require('../controllers/sidebarController.js');
let sidebarController;

describe('Sidebar Controller Test', () => {
    const sidebarElement = {
        style: {}
    };
    const overlayElement = {
        style: {}
    };

    beforeEach(() => {
        sidebarController = sidebarControllerConstructor(sidebarElement, overlayElement);
    });

    it('should construct the sidebarController', () => {
        expect(typeof sidebarController).to.equal('object');
    });

    describe('openSidebar', () => {
        it('should display the sidebar with an overlay', () => {
            sidebarElement.style.display = 'none';
            overlayElement.style.display = 'none';

            sidebarController.openSidebar();

            expect(sidebarElement.style.display).to.equal('block');
            expect(overlayElement.style.display).to.equal('block');
        });
    });

    describe('closeSidebar', () => {
        it('should hide the sidebar and the overlay', () => {
            sidebarElement.style.display = 'block';
            overlayElement.style.display = 'block';

            sidebarController.closeSidebar();

            expect(sidebarElement.style.display).to.equal('none');
            expect(overlayElement.style.display).to.equal('none');
        });
    });
});