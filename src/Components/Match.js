import React, {useEffect, useState} from 'react';
import Game from "./Game";
import {database} from '../DAO/firebase';


function Match(props) {
    const [date, setDate] = useState(new Date().toJSON().split('T')[0]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        console.log('useEffect on date change');
        database.ref('/matches/' + date).on('value', data => {
            console.log('JSON dataSnapshot: ' + JSON.stringify(data));
            if (data.exists()) {
                setGames(data.val().games);
            } else {
                setGames([]);
            }
        });
    }, [date]);

    // useEffect(() => {
    //     console.log('useEffect on games change');
    //     database.ref('/matches/' + date).set({games});
    // }, [games]);


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
        database.ref('/matches/' + date).set({games: newGames});
    }

    const saveGame = game => {
        console.log('game: ' + JSON.stringify(game));
        console.log('games: ' + JSON.stringify(games));

        //TODO: Why need to 'games' contains 'game' with old values?

        const newGames = [...games];
        const oldGame = newGames.find(g => g.id === game.id);
        newGames[newGames.indexOf(oldGame)] = game;
        setGames(newGames);

        console.log('games: ' + JSON.stringify(newGames));
        database.ref('/matches/' + date).set({games: newGames});
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

export default Match