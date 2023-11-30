"use client";

import { useState, useEffect, TextareaHTMLAttributes } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";
import { deleteNote, updateNote } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";

type Props = {
  note: Note;
  handleAddNote : Function,
  setViewedNote: Function,
  handleDeleteNode: Function,

};

function NoteViewer({note, handleAddNote, setViewedNote, handleDeleteNode}: Props) {

    const [title, setTitle] = useState("")
    const [content , setContent] = useState("");
    const [date, setDate] = useState("");
    const {user} = useUserAuth(); 

    useEffect(
        () => {
            if(note){
                setTitle(note.title);
                setContent(note.content);
                setDate(note.date);
            }
            else
            {
                setTitle("");
                setContent("");
                setDate(""); 
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
    }

    function save()
    {
        if(note && note.id)
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
        handleDeselect();
    }

    function del()
    { 
        deleteNote(user, note);
        setViewedNote();
        setTitle("");
        setContent("");
        setDate(""); 
        handleDeleteNode(note)
    }





  return (
    <div>
      <div style={{minWidth: "75vw", minHeight: "75vh"}} className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <input className="label border-5 border-black rounded" value={title} placeholder="Title" onChange={(e) => handleTitleChange(e)}></input>
          <input className="badge" value={date} placeholder="Date" onChange={(e) => handleDateChange(e)}></input>
        </div>
       <textarea style={{minHeight: "70vh"}} className="textarea-lg" placeholder="New Note" onChange={(e) => handleContentChange(e)} value={content}></textarea>
      </div>
      <div className="py-2 flex flex-row justify-end gap-2">
        <Button title="Delete" func={() => del()}></Button>
        <Button title="Save" func={save}></Button>
        <Button title="Deselect" func={() => handleDeselect()}/>
      </div>
    </div>
  );
}

export default NoteViewer;
