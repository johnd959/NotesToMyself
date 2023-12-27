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
  setDelOp: Function,

};

export default function Folders({
  toggleDrawer,
  setDelOp,
}: Props) {
  const { user } = useUserAuth();
  const [folderName, setFolderName]: [string, Function] = useState("");
  const {handleFilterByFolder, endFilter}:{handleFilterByFolder:Function, endFilter:Function} = useNotesContext(); 
  const {folders, handleCreateFolder, handleDeleteFolder, setSelectedFolder} = useFoldersContext(); 

  function handleNameChange(e: FormEvent<HTMLInputElement>) {
    setFolderName(e.currentTarget.value);
  }

  function deleteFolder(selectedFolder:Folder){
    const modal = document.getElementById("delOpModal");
    setDelOp({
      message: `Delete folder: ${selectedFolder.name}?`,
      func: async () => {
        await handleDeleteFolder(selectedFolder); 
        endFilter();
        setDelOp({
          message: "NA",
          func: () => {}
        }); 
        if (modal instanceof HTMLDialogElement){
          modal.close(); 
        }
      }
    })
    if (modal instanceof HTMLDialogElement){
      modal.showModal()
    }
  }

  async function createFolder(e:FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    await handleCreateFolder(folderName);
    setFolderName("");
  }



  return (
    <div className="flex flex-col justify-between min-h-full p-4">
      <div>
        <h2 className="text-lg">Folders</h2>
        <form method="submit" onSubmit={(e) => createFolder(e)} className="flex flex-row items-center gap-2">
          <input
          required={true}
            type="text"
            className="input input-sm max-w-x text-black dark:text-white text-lg"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => handleNameChange(e)}
          ></input>
          <IconButton
            type="submit"
            Icon={VscAdd}
            className="hover:rotate-90"
          />
        </form>
        <SideList toggleDrawer={toggleDrawer} handleDelete={deleteFolder} setFilter={(tab:Folder) => {handleFilterByFolder(tab); setSelectedFolder(tab)}} tabList={folders}></SideList>
      </div>
      <Button func={() => {endFilter(); setSelectedFolder(null); toggleDrawer();}} title="All Notes"></Button>
    </div>
  );
}
