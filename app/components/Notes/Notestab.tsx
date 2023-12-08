import React from 'react';
import { Note } from '@/app/Types/Note';

type Props = {
    note : Note,
    onSetViewedNote : Function
}

function Notestab ({note, onSetViewedNote} : Props) {


    return (
        <li style={{minWidth: "15%",minHeight:"49vh",flex:0}} className="btn rounded-large mx-2 flex flex-col justify-between" onClick={() => onSetViewedNote(note)}>
            <div style={{minHeight:"10vh"}}>
                <h2 className="text-left">{note.title.length > 25 ? note.title.substring(0, 25) + "..." : note.title }</h2>
            </div>
            <div style={{minHeight:"38vh", maxWidth:"14vw"}}>
                <p style={{minHeight:"38vh", maxWidth:"14vw", wordBreak: "break-word"}} className="flex flex-wrap text-left">{note.content}</p>
            </div>
            
        </li>
    );
}

export default Notestab;
