import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note,
    onSetViewedNote : Function
}

function Notestab ({note, onSetViewedNote} : Props) {
    return (
        <div className="btn" onClick={() => onSetViewedNote(note)}>
            <h2>{note.title}</h2>
        </div>
    );
}

export default Notestab;
