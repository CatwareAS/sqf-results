import React, {useState} from 'react';
import * as data from '../Services/data';
import Game from "./Game";

function Match(props) {
    const [date, setDate] = useState(new Date());

    const [club, setClub] = useState(data.match.club);
    const [games, setGames] = useState(data.match.games);

    //TODO: useEffect

    const addGame = () => {
        setGames([...games, {
            //TODO: find better way to create ID
            id: games.length === 0 ? -1 : games[games.length - 1].id + 1,
            playerId: props.players[0].id,
            myScore: 0,
            opponentScore: 0,
            gameType: props.gameTypes[0],
            comment: ''
        }]);
    }

    const removeGame = id => {
        setGames(games => games.filter(g => g.id !== id));
    }

    const saveGame = game => {
        alert('Saving game: ' + JSON.stringify(game));
    }

    const loadGame = date => {
        //TODO: implement
        // let match = data.findByDate(date);
        // setDate(match.date);
        // setGames(match.games);
        setDate(date);
    }

    return (
        <div>
            <label>Date</label>
            <input value={date} onChange={e => loadGame(e.target.value)} type={"date"}/>
            <button onClick={addGame}>Add Game</button>

            {games.map(
                game => <Game players={props.players}
                              gameTypes={props.gameTypes}
                              game={game}
                              removeGame={() => removeGame(game.id)}
                              saveGame={(game) => saveGame(game)}
                              key={game.id}/>
            )}

        </div>
    );
}

export default Match