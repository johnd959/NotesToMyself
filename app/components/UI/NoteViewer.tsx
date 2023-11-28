"use client";

import { useState, useEffect, TextareaHTMLAttributes } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";

type Props = {
  note: Note;
  handleAddNote : Function,

};

function NoteViewer({note, handleAddNote}: Props) {

    const [title, setTitle] = useState("New Note")
    const [content , setContent] = useState("Type Here");
    const [date, setDate] = useState(`${new Date().getDate()}`);

    useEffect(
        () => {
            setTitle(note.title);
            setContent(note.content);
            setDate(note.date);
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

    function save()
    {
        if(note)
        {
            note.title = title;
            note.content = content;
            note.date = date; 
        }
        else
        {
            handleAddNote(
                {
                    id: "",
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
      </div>
    </div>
  );
}

export default NoteViewer;
