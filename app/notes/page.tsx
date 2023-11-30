"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import { Note } from "../Types/Note";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { RedirectType, redirect } from "next/navigation";
import { createNote, getNotes } from "../_services/notes-service";

export default function NotesPage()
{   

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    let temp:Note[] = []; 
    const [notes, setNotes] = useState(temp);
    let tempNote:Note = {
      id: "",
      title: "",
      content: "",
      date: ""
    } //temp fix
    const [viewedNote, setViewedNote] = useState(tempNote);


      async function loadNotes()
      {
        let items = await getNotes(user); 
        setNotes(items);
      }
  
      useEffect(
          () => {
            try{
                loadNotes();
            }
            catch (ex : any){
                console.log(ex); 
            }
          },
          [user]
      )
       
    
      function handleSetViewedNote(note: Note)
      {
        setViewedNote(note); 
      }
    
      async function handleAddNote(note : Note)
      {
        let id = await createNote(user, note); 
        if(id){
          note.id = id; //temp fix
        }
        setViewedNote(note); 
        setNotes([...notes, note]);
      }
      function handleDeleteNote(note: Note){
        setNotes(notes.filter((item:Note) => item.id != note.id)); 
      }
    


      if(user){
        return(
            <main className="flex flex-row">
            <Sidebar notes={notes} handleSetViewedNote={handleSetViewedNote}></Sidebar>
            <section className={"flex min-h-screen flex-1 flex-col justify-center items-center bg-blue-50" + {}}>
              <NoteViewer note={viewedNote} handleAddNote={handleAddNote} setViewedNote={setViewedNote} handleDeleteNode={handleDeleteNote}></NoteViewer>
            </section>
          </main>
        )
      }
      else
      {
        redirect("/", RedirectType.push );
      }

}