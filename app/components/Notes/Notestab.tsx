import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note,
    onSetViewedNote : Function
}

function Notestab ({note, onSetViewedNote} : Props) {
    return (
        <li style={{minWidth: ""}} className="btn rounded-none mx-2 flex flex-row justify-start" onClick={() => onSetViewedNote(note)}>
            <h2 className="text-left">{note.title.length > 25 ? note.title.substring(0, 25) + "..." : note.title}</h2>
        </li>
    );
}

export default Notestab;
