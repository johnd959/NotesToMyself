"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import { Note } from "../Types/Note";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { RedirectType, redirect } from "next/navigation";
import { createNote, getNotes } from "../_services/notes-service";
import Button from "../components/UI/Button";

export default function NotesPage()
{   

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    let noteList:Note[] = []; 
    const [notes, setNotes] = useState(noteList);
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
            <main className="flex flex-col justify-between min-h-screen" >
              <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className=" text-xl ">Notes to Myself</a>
                </div>
                <div className="flex-none">
                    <Button className='btn btn-neutral ' title="Sign Out" func={() => firebaseSignOut()}></Button>
                </div>
            </div>
            <Sidebar notes={notes} handleSetViewedNote={handleSetViewedNote}></Sidebar>
           <section style={{maxHeight:"40vh"}}>
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