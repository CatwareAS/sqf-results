import React, {useEffect, useState} from 'react';
import Main from "./Components/Main";
import {auth, database} from "./Service/firebase";
import firebase from 'firebase/app';

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

    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            console.log('Logged in user: ' + result.user.displayName);
        }).catch(function (error) {
            console.log('Error while logging in: ' + JSON.stringify(error));
        });
    }

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
            <button onClick={() => login()}>Login</button>
    );
};