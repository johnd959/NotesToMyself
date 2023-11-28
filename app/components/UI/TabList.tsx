import { Note } from '@/app/Types/Note';
import React from 'react';
import Notestab from '../Notes/Notestab';

type Props = {
    notes: Note[]
    handleSetViewedNote : Function
}

function TabList({notes, handleSetViewedNote} : Props) {
    return (
        <div className='flex flex-col gap-2'>
            {notes.length > 0? notes.map((Note) => <Notestab note={Note} onSetViewedNote={handleSetViewedNote} key={Note.id}></Notestab>) : <h2>Add a note</h2>}
        </div>
    );
}

export default TabList;