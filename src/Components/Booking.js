import React, {useContext, useState} from 'react';
import {database} from '../Service/firebase';
import {UserContext} from "../App";


export default function Booking(props) {

    const uid = useContext(UserContext);

    const [date, setDate] = useState(new Date().toJSON().split('.')[0]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [clubId, setClub] = useState(props.clubs[0].id);

    const selectPlayer = e => {
        if (e.target.checked) {
            setSelectedPlayers([...selectedPlayers, e.target.value])
        } else {
            setSelectedPlayers(selectedPlayers.filter(sp => sp !== e.target.value));
        }
    }

    const book = () => {
        const formattedDate = new Intl.DateTimeFormat('bm-NO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23'
        }).format(new Date(date));
        database.ref('/' + uid + '/booking').set({
            date: formattedDate,
            friends: props.players.filter(p => selectedPlayers.includes(p.id)),
            club: props.clubs.find(c => c.id === clubId)
        });
    }

    return (
        <div className="row">
            <div className="col-sm-2">
                {props.players.map(p => (
                    <div key={p.id} className={"form-check"}>
                        <input type={"checkbox"} value={p.id} onChange={e => selectPlayer(e)}
                               className={"form-check-input"}/>
                        <label className={"form-check-label"}>{p.name}</label>
                    </div>
                ))}
            </div>

            <div className="col-sm-2">
                <input value={date} onChange={e => setDate(e.target.value)} type={"datetime-local"}
                       className={"form-control mb-1 mr-sm-1"}/>
                <select value={clubId} onChange={e => setClub(e.target.value)} className={"form-control mb-1 mr-sm-1"}>
                    {props.clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button onClick={book} className={"form-control btn btn-outline-success mb-1 mr-sm-1"}>Book</button>
            </div>

        </div>
    );
}