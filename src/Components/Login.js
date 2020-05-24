import React from 'react';
import firebase from 'firebase/app';
import {auth} from '../Service/firebase';


export default function Login() {

    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            // var token = result.credential.accessToken;
            // var user = result.user;
            console.log('Logged in user: ' + result.user.displayName);
        }).catch(function (error) {
            console.log('Error while logging in: ' + JSON.stringify(error));
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // var email = error.email;
            // var credential = error.credential;
        });
    }

    return (
        <button onClick={() => login()}>Login</button>
    );
}