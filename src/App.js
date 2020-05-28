import React, {useEffect, useState} from 'react';
import Main from "./Components/Main";
import {auth} from "./Services/Config";
import {firebaseService} from "./Services/Firebase";
import squashBallImage from './Components/squash-ball.png';

export default function App() {

    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            if (user) {
                firebaseService.setUid(user.uid);
            }
        });
    }, []);

    return (
        user ?
            <Main username={user.displayName} logout={firebaseService.logout}/>
            :
            <div className="text-center">
                <img src={squashBallImage} alt={"Login"} onClick={firebaseService.login}/>
            </div>

    );
};

export const UserContext = React.createContext();
