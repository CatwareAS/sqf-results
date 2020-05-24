import React, {useEffect, useState} from 'react';
import Main from "./Components/Main";
import Login from "./Components/Login";
import {auth, database} from "./Service/firebase";

export const UserContext = React.createContext();

export default function App() {

    const [authorized, setAuthorized] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                database.ref('/' + user.uid + '/authenticated').once('value').then(function (snapshot) {
                    if (snapshot.val()) {
                        setAuthorized(snapshot.val());
                    } else {
                        setUser(null);
                    }
                });
            } else {
                setAuthorized(false);
            }
        });
    }, []);

    const logout = () => {
        auth.signOut().then(function () {
        }).catch(function (error) {
            console.log('Error during logging out: ' + JSON.stringify(error));
        });
    }

    return (
        authorized ?
            <UserContext.Provider value={user.uid}>
                <button onClick={() => logout()}>Log Out</button>
                <Main username={user.displayName}/>
            </UserContext.Provider>
            :
            <Login/>
    );
};