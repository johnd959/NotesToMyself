import React from 'react';
import TabList from './TabList';
import { Note } from '../../Types/Note';
import RootLayout from '@/app/layout';
import Button from './Button';
import { useUserAuth } from '@/app/_utils/auth-context';


type Props = {
    notes : Note[],
    handleSetViewedNote : Function,
    height: String,
    scroll: String,
    flex: String

}

function Sidebar ({notes, handleSetViewedNote, height, scroll, flex }: Props) {

    const {firebaseSignOut} = useUserAuth(); 
    console.log(height);

    return (
        <div style={{minHeight:"54vh", maxHeight:`${height}`}} className={'bg-neutral-content flex flex-row p-5 justify-center ' + `${scroll}`}>
            
            <TabList flex={flex} handleSetViewedNote={handleSetViewedNote} notes={notes}></TabList>
            
           
        </div>
    );
}

export default Sidebar;