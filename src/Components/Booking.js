import React, {useState} from 'react';
import {database} from '../DAO/firebase';


function Booking(props) {
    const [date, setDate] = useState(new Date().toJSON().split('.')[0]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [clubId, setClub] = useState(props.clubs[0].id);

    const selectPlayer = e => {
        console.log(e.target);
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
        database.ref('/booking').set({
            date: formattedDate,
            friends: props.players.filter(p => selectedPlayers.includes(p.id)),
            club: props.clubs.find(c => c.id === clubId)
        });
    }

    return (
        <div>
            <label>Date & Time</label>
            <input value={date} onChange={e => setDate(e.target.value)} type={"datetime-local"}/>

            <label>Clubs</label>
            <select value={clubId} onChange={e => setClub(e.target.value)}>
                {props.clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <label>Players</label>
            {props.players.map(p => (
                <div key={p.id}>
                    <label>{p.name}</label>
                    <input type={"checkbox"} value={p.id} onChange={e => selectPlayer(e)}/>
                </div>
            ))}

            <button onClick={book}>Book</button>
        </div>
    );
}

export default Booking;