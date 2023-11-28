"use client";

import { useState, useEffect, TextareaHTMLAttributes } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";
import { updateNote } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";

type Props = {
  note: Note;
  handleAddNote : Function,
  setViewedNote: Function,

};

function NoteViewer({note, handleAddNote, setViewedNote}: Props) {

    const [title, setTitle] = useState("New Note")
    const [content , setContent] = useState("Type Here");
    const [date, setDate] = useState(`${new Date().getDate()}`);
    const {user} = useUserAuth(); 

    useEffect(
        () => {
            if(note){
                setTitle(note.title);
                setContent(note.content);
                setDate(note.date);
            }
        },
        [note]
    )
    

    function handleContentChange(event : React.FormEvent<HTMLTextAreaElement>)
    {
        setContent(event.currentTarget.value); 
    }
    function handleTitleChange(event: React.FormEvent<HTMLInputElement>)
    {
        setTitle(event.currentTarget.value);
    }
    function handleDateChange(event: React.FormEvent<HTMLInputElement>)
    {
        setDate(event.currentTarget.value);
    }
    function handleDeselect()
    {
        setViewedNote();
        setTitle("");
        setContent("");
        setDate(""); 
    }

    function save()
    {
        if(note)
        {
            note.title = title;
            note.content = content;
            note.date = date; 
            updateNote(user, note);
        }
        else
        {
            handleAddNote(
                {
                    title: title,
                    content: content,
                    date: date,
                }
            )
        }
    }



  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <input className="label" value={title} onChange={(e) => handleTitleChange(e)}></input>
          <input className="badge" value={date} onChange={(e) => handleDateChange(e)}></input>
        </div>
       <textarea className="textarea-lg" placeholder="New Note" onChange={(e) => handleContentChange(e)} value={content}></textarea>
      </div>
      <div className="py-2 flex flex-row justify-end gap-2">
        <Button title="Delete" func={() => alert("Notes deleted")}></Button>
        <Button title="Save" func={save}></Button>
        <Button title="Deselect" func={() => handleDeselect()}/>
      </div>
    </div>
  );
}

export default NoteViewer;
