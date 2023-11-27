import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note
}

function Notestab (props : Props) {
    return (
        <div className="p-2 hover:bg-white max-w-fit">
            <h2 className="text-white">{props.note.title}</h2>
        </div>
    );
}

export default Notestab;
