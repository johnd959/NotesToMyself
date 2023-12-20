"use client"; 
import { createContext, useContext, useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../_services/notes-service";
import { useUserAuth } from "./auth-context";


const NotesContext = createContext(); 

export function NoteContextProvider({children}){
    const [notes, setNotes] = useState([]); 
    const [originalNotes, setOriginalNotes] = useState([]); 
    const [filter, setFilter] = useState(false); 
    const {user} = useUserAuth(); 

    async function handleLoadNotes(){
        try{
            if(user){
            let items = await getNotes(user);
            items.sort((a, b) => b.date.getTime() - a.date.getTime());
            setNotes(items);
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
        setNotes([...notes, note].sort((a, b) => b.date.getTime() - a.date.getTime()))
      }

    async function handleDeleteNote(note){
        await deleteNote(user, note)
        setNotes(notes.filter((item) => item.id != note.id));
    }

    function handleSearchNotes(searchedTitle){
        setNotes(
        notes.filter((note) =>
        note.title.toLowerCase().includes(searchedTitle.toLowerCase())
      )); 
    }

    function handleFilterByFolder(folder){
        if(!filter){
          setFilter(true); 
          setNotes(notes.filter((note) => note.folder == folder));
        }
        else{
            setNotes(originalNotes.filter((note) => note.folder == folder));
        }
      }

    function endFilter(){
        setFilter(false);
        setNotes(originalNotes); 
    }

    useEffect(
        () => {
            handleLoadNotes();
        },
        [user]
    )
    return(
        <NotesContext.Provider value={{notes, handleLoadNotes, handleSearchNotes, handleFilterByFolder, endFilter, handleAddNote, handleDeleteNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotesContext(){
    return useContext(NotesContext); 
}