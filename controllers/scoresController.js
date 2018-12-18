function scoresController(schedulesFilebase) {
    function getScores(season) {
        const scheduleObject = schedulesFilebase[season];

        if (!scheduleObject) {
            return {};
        }

        
    }

    return {
        getScores
    };
}

module.exports = scoresController;
