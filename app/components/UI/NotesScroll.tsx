import React from 'react';
import TabList from './TabList';
import { Note } from '../../Types/Note';
import RootLayout from '@/app/layout';
import Button from './Button';
import { useUserAuth } from '@/app/_utils/auth-context';


type Props = {
    notes : Note[],
    handleSetViewedNote : Function,

}

function Sidebar ({notes, handleSetViewedNote}: Props) {

    const {firebaseSignOut} = useUserAuth(); 

    return (
        <div style={{minHeight:"54vh",}} className='bg-neutral-content flex flex-row p-5 content-center flex-wrap overflow-x-scroll'>
            
            <TabList handleSetViewedNote={handleSetViewedNote} notes={notes}></TabList>
            
           
        </div>
    );
}

export default Sidebar;