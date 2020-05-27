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
        <div className="form-inline">

            <select value={playerId} onChange={e => setPlayer(e.target.value)} className={"form-control mb-1 mr-sm-1"}>
                {props.players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <select value={clubId} onChange={e => setClub(e.target.value)} className={"form-control mb-1 mr-sm-1"}>
                {props.clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <input value={myScore} onChange={e => setMyScore(e.target.value)}
                   className={"form-control mb-1 mr-sm-1"} placeholder={"My Score"}/>

            <input value={opponentScore} onChange={e => setOpponentScore(e.target.value)}
                   className={"form-control mb-1 mr-sm-1"} placeholder={"Opponent Score"}/>

            <select value={gameTypeId} onChange={e => setGameTypeId(e.target.value)}
                    className={"form-control mb-1 mr-sm-1"}>
                {props.gameTypes.map(gt => <option key={gt.id} value={gt.id}>{gt.name}</option>)}
            </select>

            <input value={comment} onChange={e => setComment(e.target.value)}
                   className={"form-control mb-1 mr-sm-1"} placeholder={"Comment"}/>

            <button className={"form-control btn btn-outline-success mb-1 mr-sm-1"}
                    onClick={() => {
                        props.saveGame({id, playerId, clubId, myScore, opponentScore, gameTypeId, comment});
                    }}>
                Save Result
            </button>

            <button className={"form-control btn btn-outline-danger mb-1 mr-sm-1"} onClick={props.removeGame}>Delete Result</button>

            <hr className={"mb-4"}/>

        </div>
    );
}