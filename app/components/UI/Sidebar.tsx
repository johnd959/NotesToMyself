import {VscAccount, VscFolder, VscInfo, VscQuestion, VscSearch} from "react-icons/vsc";
import {FaUserGroup} from "react-icons/fa6"
import { ReactElement, useState } from "react";
import { Folder } from "@/app/Types/Folder";
import { Group } from "@/app/Types/Group";
import Folders from "./Folders";
import { VscSignOut } from "react-icons/vsc";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useNotesContext } from "@/app/_utils/note-context";
import { useFoldersContext } from "@/app/_utils/folder-context";

 type Props = {
    groupsPackage?: {groups:Group[], setGroups:Function},
    toggleDrawer: Function,
    setDelOp: Function,

 }



export default function Sidebar({groupsPackage, toggleDrawer, setDelOp}:Props){

    const [selectedTab, setSelectedTab]:[Boolean, Function] = useState(true);
    const {firebaseSignOut} = useUserAuth();
    const{setViewedNote} = useNotesContext(); 
    const {setSelectedFolder} = useFoldersContext(); 

    function handleSearch(){
            toggleDrawer(); 
            const modal = document.getElementById("my_modal_4");
            if (modal instanceof HTMLDialogElement) {
              modal.showModal();
            }
    }


    return(
        <div className="flex flex-row min-h-full text-base-content bg-AppPurple rounded-r-xl">
        <ul className="w-12 pb-5 pt-10 bg-black flex flex-col justify-between gap-2 content-center">
            <li>
                <span onClick={handleSearch} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out rounded-l-xl "}><VscSearch color="white" size={30}></VscSearch></span>
                <span onClick={() => setSelectedTab(true)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out rounded-l-xl " + `${selectedTab? "bg-AppPurple":"bg-slate-800"}`}><VscFolder color="white" size={30}></VscFolder></span>
                <span onClick={() => setSelectedTab(false)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out rounded-l-xl " + `${!selectedTab? "bg-AppPurple":"bg-slate-800"}`}><FaUserGroup color="white" size={30}></FaUserGroup></span> 
            </li>
            <ul className="list-none flex-col items-center">
            <li onClick={() => {let accModal = document.getElementById("accountModal"); toggleDrawer(); accModal instanceof HTMLDialogElement? accModal.showModal() : null}} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out rounded-l-xl "}><VscQuestion color="white" size={30}></VscQuestion></li>
            <div className="tooltip tooltip-right w-full" data-tip="Log out">
                <li onClick={() => {firebaseSignOut(); setViewedNote(null); setSelectedFolder(null);}} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-AppPurple transition-colors duration-400 ease-in-out rounded-l-xl "}><VscSignOut color="white" size={30}></VscSignOut></li>
            </div>    
            </ul>
        </ul>
        <div className="w-60 text-white">
            {selectedTab? <Folders setDelOp={setDelOp} toggleDrawer={toggleDrawer} /> : <div className="p-4"><h2 className="text-lg">Groups</h2><p>Feature coming soon...</p></div>}
        </div>
      </div>
    )
}