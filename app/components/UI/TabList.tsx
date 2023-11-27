import { Note } from '@/app/Types/Note';
import React from 'react';
import Notestab from '../Notes/Notestab';

type Props = {
    notes: Note[]
}

function TabList(props : Props) {
    return (
        <div className='flex flex-col'>
            {props.notes.map((Note) => <Notestab note={Note} key={Note.id}></Notestab>)}
        </div>
    );
}

export default TabList;