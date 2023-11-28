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
        <aside className='max-h-screen bg-black px-5 py-2 min-w-fit flex flex-col justify-between'>
            <div>
                <h1 className="text-white">Notes to Myself</h1>
                <TabList handleSetViewedNote={handleSetViewedNote} notes={notes}></TabList>
            </div>
            <Button title="Sign Out" func={() => firebaseSignOut()}></Button>
        </aside>
    );
}

export default Sidebar;