"use client";

import {useState, useContext, createContext, useEffect} from 'react';
import {useUserAuth} from './auth-context'; 
import {getFolders, createFolder, deleteFolder} from '../_services/notes-service'


const FolderContext = createContext(); 

export function FolderContextProvider({children}){

    const {user} = useUserAuth(); 
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);

    async function handleGetFolders(){
        try{
            if(user){
            let folders = await getFolders(user); 
            setFolders(folders);                 
            }

        }
        catch(ex){
            console.error(ex); 
        }
    }

    async function handleDeleteFolder(folder){
        await deleteFolder(user, folder); 
        setFolders(folders.filter((item) => item.id != folder.id)); 
      }

        useEffect(
            () => {
                handleGetFolders();
            },
            [user]
        )
    


    async function handleCreateFolder(folderName) {
        let newFolder = {
          name: folderName,
        };
        let id = await createFolder(user, newFolder);
        if (id) {
          newFolder.id = id;
        }
        setFolders([...folders, newFolder]);
      }



    return(
        <FolderContext.Provider value={{folders, selectedFolder, setSelectedFolder, handleCreateFolder, handleDeleteFolder}}>
            {children}
        </FolderContext.Provider>
    )
}

export function useFoldersContext(){
    return useContext(FolderContext); 
}