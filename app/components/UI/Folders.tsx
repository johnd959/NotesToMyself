"use client";
import Button from "./Button";
import IconButton from "./IconButton";
import { VscAdd } from "react-icons/vsc";
import { FormEvent, useEffect, useState } from "react";
import { Folder } from "@/app/Types/Folder";
import { createFolder, getFolders } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import SideList from "./SideList";

type Props = {
  folderList: Folder[],
  setFolders: Function,
  filterByFolder: Function,
  handleDeleteFolder: Function, 
};

export default function Folders({
  folderList,
  setFolders,
  filterByFolder,
  handleDeleteFolder,
}: Props) {
  const { user } = useUserAuth();
  const [folderName, setFolderName]: [string, Function] = useState("");

  function handleNameChange(e: FormEvent<HTMLInputElement>) {
    setFolderName(e.currentTarget.value);
  }

  async function handleCreateFolder() {
    let newFolder = {
      id: "",
      name: folderName,
    };
    let id = await createFolder(user, newFolder);
    if (id) {
      newFolder.id = id;
    }
    setFolders([...folderList, newFolder]);
    setFolderName("");
  }

  return (
    <div className="flex flex-col justify-between min-h-full">
      <div>
        <h2 className="text-lg">Folders</h2>
        <div className="flex flex-row items-center gap-2">
          <input
            type="text"
            className="input input-sm max-w-xs text-black"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => handleNameChange(e)}
          ></input>
          <IconButton
            Icon={VscAdd}
            func={handleCreateFolder}
            className="hover:rotate-12"
          />
        </div>
        <SideList handleDelete={handleDeleteFolder} setFilter={filterByFolder} tabList={folderList}></SideList>
      </div>
      <Button func={() => filterByFolder("", false)} title="End Filter"></Button>
    </div>
  );
}
