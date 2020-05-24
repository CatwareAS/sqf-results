import React, {useContext, useEffect, useState} from 'react';
import Game from "./Game";
import {database} from '../Service/firebase';
import {UserContext} from "../App";


export default function Match(props) {

    const uid = useContext(UserContext);

    const [date, setDate] = useState(new Date().toJSON().split('T')[0]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        database.ref('/' + uid + '/matches/' + date).on('value', data => {
            if (data.exists()) {
                setGames(data.val().games);
            } else {
                setGames([]);
            }
        });
    }, [date, uid]);

    const addGame = () => {
        setGames([...games, {
            id: games.length === 0 ? 1 : Math.max(...games.map(g => g.id)) + 1,
            playerId: props.players[0].id,
            clubId: props.clubs[0].id,
            myScore: 0,
            opponentScore: 0,
            gameTypeId: props.gameTypes[0].id,
            comment: ''
        }]);
    }

    const removeGame = id => {
        const newGames = games.filter(g => g.id !== id);
        setGames(newGames);
        database.ref('/' + uid + '/matches/' + date).set({games: newGames});
    }

    const saveGame = game => {
        // console.log('game: ' + JSON.stringify(game));
        // console.log('games: ' + JSON.stringify(games));

        //TODO: Why 'games' contains 'game' with old values?

        const newGames = [...games];
        const oldGame = newGames.find(g => g.id === game.id);
        newGames[newGames.indexOf(oldGame)] = game;
        setGames(newGames);

        // console.log('games: ' + JSON.stringify(newGames));
        database.ref('/' + uid + '/matches/' + date).set({games: newGames});
    }

    return (
        <div>
            <label>Date</label>
            <input value={date} onChange={e => setDate(e.target.value)} type={"date"}/>

            <button onClick={addGame}>Add Game</button>

            {games.map(
                game => <Game players={props.players}
                              clubs={props.clubs}
                              gameTypes={props.gameTypes}
                              game={game}
                              removeGame={() => removeGame(game.id)}
                              saveGame={(game) => saveGame(game)}
                              key={game.id}/>
            )}

        </div>
    );
}