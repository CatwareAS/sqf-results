import {players, clubs} from '../DB/firebase';

let match = {
    date: "2020-05-20",
    club: clubs[0],
    games: [
        {
            id: -1,
            playerId: players[0].id,
            myScore: 11,
            opponentScore: 5,
            // gameType: gameTypes[0],
            comment: "All good"
        }
    ]
}

const findByDate = date => {
    return {
        date,
        club: clubs[0],
        games: [
            {
                id: -11,
                playerId: players[1].id,
                myScore: 10,
                opponentScore: 9,
                // gameType: gameTypes[1],
                comment: "All good"
            }
        ]
    }
}

// export {match, findByDate};