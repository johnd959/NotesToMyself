"use client"; 
import { createContext, useContext, useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../_services/notes-service";
import { useUserAuth } from "./auth-context";
import { useFoldersContext } from "./folder-context";


const NotesContext = createContext(); 

export function NoteContextProvider({children}){
    const [notes, setNotes] = useState([]); 
    const [originalNotes, setOriginalNotes] = useState([]); 
    const {selectedFolder} = useFoldersContext();
    const [viewedNote, setViewedNote] = useState(null);
    const [filter, setFilter] = useState(false); 
    const {user} = useUserAuth(); 

    async function handleLoadNotes(){
        try{
            if(user){
            let items = await getNotes(user);
            items.sort((a, b) => b.date.getTime() - a.date.getTime());
            setOriginalNotes(items);
            }

        }
        catch(ex){
            console.error(ex); 
        }
    }

    async function handleAddNote(note) {
        let id = await createNote(user, note);
        if (id) {
          note.id = id;
        }
    
        setOriginalNotes([...originalNotes, note].sort((a, b) => b.date.getTime() - a.date.getTime()));
      }

    async function handleDeleteNote(note){
        await deleteNote(user, note)
        setOriginalNotes(originalNotes.filter((item) => item.id != note.id))
    }

    function handleSearchNotes(searchedString){
        setViewedNote(null); 
        setNotes(
        notes.filter((note) =>
        `${note.title + "\U+0020" + note.content}`.toLowerCase().includes(searchedString.toLowerCase())
      )); 
    }

    function handleFilterByFolder(folder){
        setViewedNote(null); 
        if(!filter && folder.id !== ""){
          setFilter(true); 
          setNotes(notes.filter((note) => note.folder == folder.id));
        }
        else{
            setNotes(originalNotes.filter((note) => note.folder == folder.id));
        }
      }

    function endFilter(folder=null){
        setViewedNote(null);
        if(folder){
            setNotes(originalNotes.filter((note) => note.folder == folder.id))
        }
        else{
            setFilter(false);
            setNotes(originalNotes); 
        }
    }

    useEffect(
        () => {
            handleLoadNotes();
        },
        [user]
    )

    useEffect(
        () => {
            if(filter && selectedFolder){
                setNotes(originalNotes.filter((note) => note.folder === selectedFolder.id));
            }else{
                setNotes(originalNotes);
            }
            
        },
        [originalNotes]
    )

    return(
        <NotesContext.Provider value={{notes, viewedNote, handleLoadNotes, handleFilterByFolder, handleSearchNotes, endFilter, handleAddNote, handleDeleteNote, setViewedNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotesContext(){
    return useContext(NotesContext); 
}