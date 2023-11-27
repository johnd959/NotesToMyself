import React from 'react';
import TabList from './UI/TabList';
import { Note } from '../Types/Note';



const notes : Note[] = [
    {
        id: "1234",
        title: "Buy dog food",
        content: "Buy 2 bags of dog food from Superstore",
        date: "Today"
    }
]

function Sidebar({props} : any) {
    return (
        <div className='max-h-screen bg-black px-5 py-2 min-w-fit'>
            <h1 className="text-white">Notes to Myself</h1>
            <TabList notes={notes}></TabList>
        </div>
    );
}

export default Sidebar;