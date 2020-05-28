import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyD83GL_PEIuwgRRFP3qqQtpYEyimlOmB_4",
    authDomain: "squash-booker.firebaseapp.com",
    databaseURL: "https://squash-booker.firebaseio.com",
    projectId: "squash-booker",
    storageBucket: "squash-booker.appspot.com",
    messagingSenderId: "103129208665"
});

export const database = app.database();
export const auth = app.auth();