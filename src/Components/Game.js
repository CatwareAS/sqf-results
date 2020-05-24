import React, {useState} from 'react';

export default function Game(props) {
    let game = props.game;

    const [id] = useState(game.id);
    const [playerId, setPlayer] = useState(game.playerId);
    const [clubId, setClub] = useState(game.clubId);
    const [myScore, setMyScore] = useState(game.myScore);
    const [opponentScore, setOpponentScore] = useState(game.opponentScore);
    const [gameTypeId, setGameTypeId] = useState(game.gameTypeId);
    const [comment, setComment] = useState(game.comment);

    return (
        <div>

            <label>Players</label>
            <select value={playerId} onChange={e => setPlayer(e.target.value)}>
                {props.players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <label>Clubs</label>
            <select value={clubId} onChange={e => setClub(e.target.value)}>
                {props.clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <label>Result</label>
            <input value={myScore} onChange={e => setMyScore(e.target.value)} type={"number"} min={0}/>
            :
            <input value={opponentScore} onChange={e => setOpponentScore(e.target.value)} type={"number"} min={0}/>

            <label>Game Type</label>
            <select value={gameTypeId} onChange={e => setGameTypeId(e.target.value)}>
                {props.gameTypes.map(gt => <option key={gt.id} value={gt.id}>{gt.name}</option>)}
            </select>

            <label>Comment</label>
            <input value={comment} onChange={e => setComment(e.target.value)}/>

            <button
                onClick={() => {
                    props.saveGame({
                        id,
                        playerId,
                        clubId,
                        myScore,
                        opponentScore,
                        gameTypeId,
                        comment
                    });
                }}>
                Save Result
            </button>

            <button onClick={props.removeGame}>Delete Result</button>

        </div>
    );
}