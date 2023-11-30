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
        <aside style={{minWidth: "15em"}} className='bg-black flex flex-col justify-between content-center'>
            <div>
                <h1 className="text-white text-center mb-10 p-2">Notes to Myself</h1>
                <TabList handleSetViewedNote={handleSetViewedNote} notes={notes}></TabList>
            </div>
            <Button className='rounded-none mx-2 mb-2' title="Sign Out" func={() => firebaseSignOut()}></Button>
        </aside>
    );
}

export default Sidebar;