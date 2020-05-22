import React, {useState} from 'react';

function Game(props) {
    let game = props.game;
    let players = props.players;
    let gameTypes = props.gameTypes;

    const [id] = useState(game.id);
    const [playerId, setPlayer] = useState(game.playerId);
    const [myScore, setMyScore] = useState(game.myScore);
    const [opponentScore, setOpponentScore] = useState(game.opponentScore);
    const [gameType, setGameType] = useState(game.gameType);
    const [comment, setComment] = useState(game.comment);

    return (
        <div>

            <label>Players</label>
            <select value={playerId} onChange={e => setPlayer(e.target.value)}>
                {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <label>Result</label>
            <input value={myScore} onChange={e => setMyScore(e.target.value)} type={"number"} min={0}/>
            :
            <input value={opponentScore} onChange={e => setOpponentScore(e.target.value)} type={"number"} min={0}/>

            <label>Game Type</label>
            <select value={gameType} onChange={e => setGameType(e.target.value)}>
                {gameTypes.map(gt => <option key={gt} value={gt}>{gt}</option>)}
            </select>

            <label>Comment</label>
            <input value={comment} onChange={e => setComment(e.target.value)}/>

            <button
                onClick={() => {
                    props.saveGame({
                        id,
                        playerId,
                        myScore,
                        opponentScore,
                        gameType,
                        comment
                    });
                }}>
                Save Result
            </button>

            <button onClick={props.removeGame}>Delete Result</button>

        </div>
    );
}

export default Game