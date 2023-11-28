"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import { Note } from "../Types/Note";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { redirect } from "next/navigation";
import { getNotes } from "../_services/notes-service";
import { loadManifestWithRetries } from "next/dist/server/load-components";

export default function NotesPage()
{   

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [notes, setNotes] = useState([]);
    const [viewedNote, setViewedNote] = useState({
        id: "11212",
        title: "Empty",
        content: "Lorem ipsum",
        date: "Today"
    });


      async function loadNotes()
      {
        let items = await getNotes(user); 
        console.log(items);
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
        console.log(note);
        setViewedNote(note); 
      }
    
      function handleAddNote(note : Note)
      {
        setNotes([...notes, note]);
      }
    


      if(user){
        console.log("In notes with: " + user.displayName)
        return(
            <main className="flex flex-row">
            <Sidebar notes={notes} handleSetViewedNote={handleSetViewedNote}></Sidebar>
            <section className="flex min-h-screen min-w-full flex-col justify-center items-center bg-blue-50">
              <NoteViewer note={viewedNote} handleAddNote={handleAddNote}></NoteViewer>
            </section>
          </main>
        )
      }
      else
      {
        redirect("/", 'push');
      }

}