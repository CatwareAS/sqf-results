import React, {useEffect, useState} from 'react';
import Game from "./Game";
import {firebaseService} from '../Services/Firebase';


export default function Match(props) {

    const [date, setDate] = useState(new Date().toJSON().split('T')[0]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        firebaseService.findGamesByDate(date).then(setGames);
    }, [date]);

    const addGame = () => {
        //Copy some values from last registered game if any

        const lg = games.length === 0 ? false : games[0];

        setGames([{
            id: lg ? Math.max(...games.map(g => g.id)) + 1 : 1,
            playerId: lg ? lg.playerId : props.players[0].id,
            clubId: lg ? lg.clubId : props.clubs[0].id,
            myScore: '',
            opponentScore: '',
            gameTypeId: lg ? lg.gameTypeId : props.gameTypes[0].id,
            comment: ''
        },
            ...games]);
    }

    const removeGame = id => {
        const newGames = games.filter(g => g.id !== id);
        setGames(newGames);
        firebaseService.setGamesForDate(date, newGames);
    }

    const saveGame = game => {
        const newGames = [...games];
        const oldGameIndex = newGames.findIndex(g => g.id === game.id);
        newGames[oldGameIndex] = game;
        setGames(newGames);

        firebaseService.setGamesForDate(date, newGames);
    }

    return (
        <div>

            <div className="form-inline">

                <input value={date} onChange={e => setDate(e.target.value)} type={"date"}
                       className={"form-control mb-1 mr-sm-1"}/>

                <button onClick={addGame}
                        className={"btn btn-outline-success form-control mb-1 mr-sm-1"}>Add Game
                </button>

            </div>

            <hr/>

            <div className="table-responsive">
                {games.map(
                    game =>
                            <Game players={props.players}
                                  clubs={props.clubs}
                                  gameTypes={props.gameTypes}
                                  game={game}
                                  removeGame={() => removeGame(game.id)}
                                  saveGame={(game) => saveGame(game)}
                                  key={game.id}/>
                )}
            </div>

        </div>
    );
}