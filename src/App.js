import React from 'react';
import Match from "./Components/Match.js";
import * as firebaseData from 'DB/firebase';

function App() {
    return <Match players={firebaseData.players} clubs={firebaseData.clubs} gameTypes={firebaseData.gameTypes}/>
}

export default App;
