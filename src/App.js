import React, {useEffect, useState} from 'react';
import Match from "./Components/Match";
import {database} from './DAO/firebase';

function App() {

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);

    // database.ref('/gameTypes').set([{id: 1, name: 'Standard'}, {id: 2, name: 'Egyptian'}]);

    useEffect(() => {
        database.ref('/players').once('value').then(function (snapshot) {
            setPlayers(snapshot.val());
        });
    }, []);

    useEffect(() => {
        database.ref('/clubs').once('value').then(function (snapshot) {
            setClubs(snapshot.val());
        });
    }, []);

    useEffect(() => {
        database.ref('/gameTypes').once('value').then(function (snapshot) {
            setGameTypes(snapshot.val());
        });
    }, []);

    return (
        clubs.length === 0 || players.length === 0 || gameTypes.length === 0 ?
            'Loading...'
            :
            <Match players={players} clubs={clubs} gameTypes={gameTypes}/>
    );
}

export default App;
