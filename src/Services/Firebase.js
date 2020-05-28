import {auth, database} from "./Config";
import * as firebase from "firebase";

class Firebase {
    setUid(uid) {
        this.uid = uid;
    }

    async getPlayers() {
        return this.getStaticData('players');
    }

    async getClubs() {
        return this.getStaticData('clubs');
    }

    async getGameTypes() {
        return this.getStaticData('gameTypes');
    }

    async findGamesByDate(date) {
        const response = await database
            .ref(`/${this.uid}/matches/${date}`)
            .once('value');
        return response.exists() ? response.val().games : [];
    }

    async getStaticData(path) {
        const response = await database
            .ref(`/${this.uid}/${path}`)
            .once('value');
        if (response.val()) {
            return response.val();
        } else {
            this.logout();
            return [];
        }
    }

    setGamesForDate(date, games) {
        database.ref(`/${this.uid}/matches/${date}`).set({games});
    }

    makeBooking(booking) {
        database.ref(`/${this.uid}/booking`).set(booking);
    }

    login() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            console.log('Logged in user: ' + result.user.displayName);
        }).catch(function (error) {
            console.log('Error while logging in: ' + JSON.stringify(error));
        });
    }

    logout() {
        auth.signOut().then(function () {
        }).catch(function (error) {
            console.log('Error during logging out: ' + JSON.stringify(error));
        });
    }
}

export const firebaseService = new Firebase();