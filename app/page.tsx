"use client"; 

import Image from "next/image";
import NoteViewer from "./components/UI/NoteViewer";
import { Note } from "./Types/Note";
import { useState } from "react";
import Sidebar from "./components/UI/Sidebar";

export default function Home() {

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

  



  return (
    <main className="flex flex-row">
      <Sidebar notes={notes} handleSetViewedNote={handleSetViewedNote}></Sidebar>
      <section className="flex min-h-screen min-w-full flex-col justify-center items-center bg-blue-50">
        <NoteViewer note={viewedNote} handleAddNote={handleAddNote}></NoteViewer>
      </section>
    </main>
  );
}
