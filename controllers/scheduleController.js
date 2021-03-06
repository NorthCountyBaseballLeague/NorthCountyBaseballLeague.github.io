function scheduleController(schedulesFilebase) {
    function getSchedule(season) {
        const scheduleObject = schedulesFilebase[season];

        if (!scheduleObject) {
            return {};
        }

        return scheduleObject.schedule;
    }

    function buildSchedule(schedule, scheduleBody, document) {
        const firstGameVisitors = schedule && schedule[0] ? schedule[0].visitors : null;
        const firstGameHome = schedule && schedule[0] ? schedule[0].home : null;

        const firstGameInRound = {
            index: 0,
            visitors: firstGameVisitors,
            home: firstGameHome
        };
        let prevDate;
        const roundsArray = [];
        let curRoundNum = 0;

        for (let i = 0; i < schedule.length; i++) {
            const curGame = schedule[i];

            const row = document.createElement('tr');

            const round = document.createElement('td');
            const date = document.createElement('td');
            const time = document.createElement('td');
            const visitors = document.createElement('td');
            const home = document.createElement('td');
            const field = document.createElement('td');
            const winner = document.createElement('td');

            roundsArray.push(round);

            round.classList.add('round-column');
            winner.classList.add('winner-column');

            if (isFirstGameInRound(firstGameInRound, curGame.visitors, curGame.home)) {
                round.classList.add('new-round');
                date.classList.add('new-round');
                time.classList.add('new-round');
                visitors.classList.add('new-round');
                home.classList.add('new-round');
                field.classList.add('new-round');
                winner.classList.add('new-round');

                if (i !== 0) {
                    curRoundNum += 1;
                    const roundText = document.createTextNode(`Round ${curRoundNum}`);
                    const roundIndex = Math.floor(((i - 1) - firstGameInRound.index) / 2) + firstGameInRound.index;
                    firstGameInRound.index = i;
                    roundsArray[roundIndex].appendChild(roundText);
                }
            }
            else if (isAllStarGame(curGame.visitors)) {
                round.classList.add('new-round');
                date.classList.add('new-round');
                time.classList.add('new-round');
                visitors.classList.add('new-round');
                home.classList.add('new-round');
                field.classList.add('new-round');
                winner.classList.add('new-round');
            }
            else if (isNewWeek(prevDate, curGame.date)) {
                date.classList.add('new-week');
                time.classList.add('new-week');
                visitors.classList.add('new-week');
                home.classList.add('new-week');
                field.classList.add('new-week');
                winner.classList.add('new-week');
            }
            else if (isLastWeek(i, schedule)) {
                round.classList.add('last-game');
                date.classList.add('last-game');
                time.classList.add('last-game');
                visitors.classList.add('last-game');
                home.classList.add('last-game');
                field.classList.add('last-game');
                winner.classList.add('last-game');

                curRoundNum += 1;
                const roundText = document.createTextNode(`Round ${curRoundNum}`);
                const roundIndex = Math.floor((i - firstGameInRound.index) / 2) + firstGameInRound.index;
                roundsArray[roundIndex].appendChild(roundText);
            }

            prevDate = curGame.date;

            const dateText = document.createTextNode(curGame.date || '');
            const timeText = document.createTextNode(curGame.time || '');
            const visitorsText = document.createTextNode(curGame.visitors || '');
            const homeText = document.createTextNode(curGame.home || '');
            const fieldText = document.createTextNode(curGame.field || '');
            const winnerText = document.createTextNode(curGame.winner || '');

            date.appendChild(dateText);
            time.appendChild(timeText);
            visitors.appendChild(visitorsText);
            home.appendChild(homeText);
            field.appendChild(fieldText);
            winner.appendChild(winnerText);

            row.appendChild(round);
            row.appendChild(date);
            row.appendChild(time);
            row.appendChild(visitors);
            row.appendChild(home);
            row.appendChild(field);
            row.appendChild(winner);

            scheduleBody.appendChild(row);
        }
    };

    function isFirstGameInRound(firstGameInRound, visitors, home) {
        const doesVisitorHomeTeamMatch = visitors === firstGameInRound.visitors || visitors === firstGameInRound.home;
        const doesHomeTeamMatch = home === firstGameInRound.home || home === firstGameInRound.visitors;
        return doesVisitorHomeTeamMatch && doesHomeTeamMatch;
    };

    function isAllStarGame(visitors) {
        return visitors === 'ALL STAR GAME';
    };

    function isNewWeek(prevDate, curDate) {
        return prevDate !== curDate;
    };

    function isLastWeek(index, schedule) {
        return index === (schedule.length - 1);
    };

    return {
        getSchedule,
        buildSchedule
    };
}

module.exports = scheduleController;
