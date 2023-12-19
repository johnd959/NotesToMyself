import {VscFolder} from "react-icons/vsc";
import {FaUserGroup} from "react-icons/fa6"
import { ReactElement, useState } from "react";
import { Folder } from "@/app/Types/Folder";
import { Group } from "@/app/Types/Group";
import Folders from "./Folders";

 type Props = {
    foldersPackage: {folders:Folder[], setFolders: Function, handleDeleteFolder: Function},
    groupsPackage?: {groups:Group[], setGroups:Function},
    filterByFolder: Function,


 }



export default function Sidebar({foldersPackage, groupsPackage, filterByFolder}:Props){

    const [selectedTab, setSelectedTab]:[Boolean, Function] = useState(true);


    return(
        <div className="flex flex-row min-h-full bg-black text-base-content">
        <ul className="w-12 bg-slate-800 flex flex-col gap-2 content-center pt-16">
          <li onClick={() => setSelectedTab(true)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-black transition-colors duration-400 ease-in-out " + `${selectedTab? "bg-black":"bg-slate-800"}`}><VscFolder color="white" size={30}></VscFolder></li>
          <li onClick={() => setSelectedTab(false)} className={"cursor-pointer flex flex-row justify-center py-2 hover:bg-black transition-colors duration-400 ease-in-out " + `${!selectedTab? "bg-black":"bg-slate-800"}`}><FaUserGroup color="white" size={30}></FaUserGroup></li>
        </ul>
        <div className="w-60 text-white p-4">
            {selectedTab? <Folders filterByFolder={filterByFolder} folderList={foldersPackage.folders} setFolders={foldersPackage.setFolders} handleDeleteFolder={foldersPackage.handleDeleteFolder}  /> : <h2 className="text-lg">Groups</h2>}
        </div>
      </div>
    )
}