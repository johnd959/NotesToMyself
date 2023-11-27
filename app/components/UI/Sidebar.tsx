import React from 'react';
import TabList from './TabList';
import { Note } from '../../Types/Note';
import RootLayout from '@/app/layout';


type Props = {
    notes : Note[],
    handleSetViewedNote : Function,

}

function Sidebar ({notes, handleSetViewedNote}: Props) {
    return (
        <aside className='max-h-screen bg-black px-5 py-2 min-w-fit'>
            <h1 className="text-white">Notes to Myself</h1>
            <TabList handleSetViewedNote={handleSetViewedNote} notes={notes}></TabList>
        </aside>
    );
}

export default Sidebar;