import React, {useContext, useEffect, useState} from 'react';
import Match from "./Match";
import {database} from '../Service/firebase';
import Booking from "./Booking";
import {UserContext} from "../App";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";


export default function Main(props) {

    const uid = useContext(UserContext);

    const [players, setPlayers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [gameTypes, setGameTypes] = useState([]);

    // database.ref('/' + uid + '/gameTypes').set([{id: "1", name: 'Standard'}, {id: "2", name: 'Egyptian'}]);

    useEffect(() => {
        database.ref('/' + uid + '/players').once('value').then(function (snapshot) {
            if (snapshot) {
                setPlayers(snapshot.val());
            }
        });
    }, [uid]);

    useEffect(() => {
        database.ref('/' + uid + '/clubs').once('value').then(function (snapshot) {
            if (snapshot) {
                setClubs(snapshot.val());
            }
        });
    }, [uid]);

    useEffect(() => {
        database.ref('/' + uid + '/gameTypes').once('value').then(function (snapshot) {
            if (snapshot) {
                setGameTypes(snapshot.val());
            }
        });
    }, [uid]);

    return (
        (clubs.length !== 0 && players.length !== 0 && gameTypes.length !== 0) &&
            <BrowserRouter>
                <div className={"container-fluid"}>
                    <nav className={"navbar navbar-light bg-light"}>
                        <NavLink to="/">Results</NavLink>
                        <NavLink to="/book">Book Match</NavLink>
                        <NavLink to="/" onClick={props.logout}>Logout</NavLink>
                    </nav>

                    <hr />

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
    );
}