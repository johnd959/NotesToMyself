"use client";

import { useEffect, useState } from "react";
import NotesScroll from "../components/UI/NotesScroll";
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
      date: new Date(),
    } //temp fix
    const [viewedNote, setViewedNote] = useState(tempNote);
    const [editorVisible, setEditorVisible] = useState(true); 


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
            <NotesScroll flex={editorVisible == true? '' : "flex-wrap"} scroll={editorVisible == true ? "overflow-x-scroll" : "overflow-y-scroll"} notes={notes} handleSetViewedNote={handleSetViewedNote} height={editorVisible == true ? "54vh" : "87vh"}></NotesScroll>
           <section style={{maxHeight:"40vh"}}>
            <NoteViewer setEditorVisible={setEditorVisible} display={editorVisible == true? "flex" : "hidden"} note={viewedNote} handleAddNote={handleAddNote} setViewedNote={setViewedNote} handleDeleteNode={handleDeleteNote}></NoteViewer>
           </section>
          {editorVisible == false? <Button className="sticky bottom-0" title="Edit Notes" func={() => setEditorVisible(true)}></Button> : <></>}
          </main>
        )
      }
      else
      {
        redirect("/", RedirectType.push );
      }

}