import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note,
    onSetViewedNote : Function
}

function Notestab ({note, onSetViewedNote} : Props) {
    return (
        <div className="btn">
            <h2 onClick={() => onSetViewedNote(note)}>{note.title}</h2>
        </div>
    );
}

export default Notestab;
