import {VscFolder} from "react-icons/vsc";
import {FaUserGroup} from "react-icons/fa6"
import { ReactElement, useState } from "react";
import { Folder } from "@/app/Types/Folder";
import { Group } from "@/app/Types/Group";
import Folders from "./Folders";
import { VscSignOut } from "react-icons/vsc";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useNotesContext } from "@/app/_utils/note-context";

 type Props = {
    groupsPackage?: {groups:Group[], setGroups:Function},
    toggleDrawer: Function,


 }



export default function Sidebar({groupsPackage, toggleDrawer}:Props){

    const [selectedTab, setSelectedTab]:[Boolean, Function] = useState(true);
    const {firebaseSignOut} = useUserAuth();
    const{setViewedNote} = useNotesContext(); 


    return(
        <div className="flex pb-5 flex-row min-h-full text-base-content bg-AppPurple">
        <ul className="w-12 bg-black flex flex-col justify-between gap-2 content-center pt-16">
            <li>
                         <span onClick={() => setSelectedTab(true)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out " + `${selectedTab? "bg-AppPurple":"bg-slate-800"}`}><VscFolder color="white" size={30}></VscFolder></span>
          <span onClick={() => setSelectedTab(false)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out " + `${!selectedTab? "bg-AppPurple":"bg-slate-800"}`}><FaUserGroup color="white" size={30}></FaUserGroup></span> 
            </li>
            <li onClick={() => {firebaseSignOut(); setViewedNote(null);}} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out "}><VscSignOut color="white" size={30}></VscSignOut></li>

        </ul>
        <div className="w-60 text-white p-4">
            {selectedTab? <Folders toggleDrawer={toggleDrawer} /> : <h2 className="text-lg">Groups</h2>}
        </div>
      </div>
    )
}