"use client";
import Button from "./Button";
import IconButton from "./IconButton";
import { VscAdd } from "react-icons/vsc";
import { FormEvent, useEffect, useState } from "react";
import { Folder } from "@/app/Types/Folder";
import { createFolder, getFolders } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import SideList from "./SideList";
import { useNotesContext } from "@/app/_utils/note-context";
import { useFoldersContext } from "@/app/_utils/folder-context";

type Props = {
  toggleDrawer: Function,

};

export default function Folders({
  toggleDrawer,
}: Props) {
  const { user } = useUserAuth();
  const [folderName, setFolderName]: [string, Function] = useState("");
  const {handleFilterByFolder, endFilter}:{handleFilterByFolder:Function, endFilter:Function} = useNotesContext(); 
  const {folders, handleCreateFolder, handleDeleteFolder, setSelectedFolder} = useFoldersContext(); 

  function handleNameChange(e: FormEvent<HTMLInputElement>) {
    setFolderName(e.currentTarget.value);
  }



  return (
    <div className="flex flex-col justify-between min-h-full p-4">
      <div>
        <h2 className="text-lg">Folders</h2>
        <div className="flex flex-row items-center gap-2">
          <input
          required={true}
            type="text"
            className="input input-sm max-w-x text-black dark:text-white"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => handleNameChange(e)}
          ></input>
          <IconButton
            Icon={VscAdd}
            func={() => {handleCreateFolder(folderName); setFolderName("");}}
            className="hover:rotate-90"
          />
        </div>
        <SideList toggleDrawer={toggleDrawer} handleDelete={handleDeleteFolder} setFilter={(tab:Folder) => {handleFilterByFolder(tab); setSelectedFolder(tab)}} tabList={folders}></SideList>
      </div>
      <Button func={() => {endFilter(); setSelectedFolder(null); toggleDrawer();}} title="All Notes"></Button>
    </div>
  );
}
