"use client";

import { useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import { Note } from "../Types/Note";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { redirect } from "next/navigation";

export default function NotesPage()
{   

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
     

    const [notes, setNotes] = useState(
        [
          {
            id: "1234",
            title: "Buy dog food",
            content: "Buy 2 bags of dog food from Superstore",
            date: "Today",
          },
          {
            id: "1235",
            title: "Buy dog food 2",
            content: "Buy 3 bags of dog food from Superstore",
            date: "Today",
          },
        ]
      )
      const [viewedNote, setViewedNote] = useState(notes[0]);
    
      function handleSetViewedNote(note: Note)
      {
        console.log('running');
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