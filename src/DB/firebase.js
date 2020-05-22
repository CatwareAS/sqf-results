import * as firebase from 'firebase/app';
import 'firebase/database'

const config = {
    apiKey: "AIzaSyD83GL_PEIuwgRRFP3qqQtpYEyimlOmB_4",
    authDomain: "squash-booker.firebaseapp.com",
    databaseURL: "https://squash-booker.firebaseio.com",
    projectId: "squash-booker",
    storageBucket: "squash-booker.appspot.com",
    messagingSenderId: "103129208665"
};

firebase.initializeApp(config);

const databaseRef = firebase.database().ref();

export const players = databaseRef.child("players");
export const clubs = databaseRef.child("clubs");
export const gameTypes = ["Standard", "Egyptian"];

