function sidebarController(sidebarElement, overlayElement) {

    function closeSidebar() {
        sidebarElement.style.display = 'none';
        overlayElement.style.display = 'none';
    }

    function openSidebar() {
        sidebarElement.style.display = 'block';
        overlayElement.style.display = 'block';
    }

    return {
        closeSidebar,
        openSidebar
    };
}

module.exports = sidebarController;