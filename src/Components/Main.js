import React, {useEffect, useState} from 'react';
import Match from "./Match";
import {firebaseService} from '../Services/Firebase';
import Booking from "./Booking";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";


export default function Main(props) {

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);

    // database.ref('/' + uid + '/gameTypes').set([{id: "1", name: 'Standard'}, {id: "2", name: 'Egyptian'}]);

    useEffect(() => {
        firebaseService.getPlayers().then(setPlayers);
        firebaseService.getClubs().then(setClubs);
        firebaseService.getGameTypes().then(setGameTypes);
    }, []);

    return (
        (clubs.length !== 0 && players.length !== 0 && gameTypes.length !== 0) ?
            <BrowserRouter>
                <div className={"container-fluid"}>
                    <nav className={"navbar navbar-light bg-light"}>
                        <NavLink to="/">Results</NavLink>
                        <NavLink to="/book">Book Match</NavLink>
                        <NavLink to="/" onClick={props.logout}>Logout</NavLink>
                    </nav>

                    <hr/>

                    <Switch>
                        <Route path="/book">
                            <Booking players={players} clubs={clubs}/>
                        </Route>
                        <Route path="/">
                            <Match players={players} clubs={clubs} gameTypes={gameTypes}/>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
            :
            null
    );
}