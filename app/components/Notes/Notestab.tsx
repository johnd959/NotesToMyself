import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note,
    onSetViewedNote : Function
}

function Notestab ({note, onSetViewedNote} : Props) {
    return (
        <div className="p-2 hover:bg-white max-w-fit">
            <h2 className="text-white" onClick={() => onSetViewedNote(note)}>{note.title}</h2>
        </div>
    );
}

export default Notestab;
