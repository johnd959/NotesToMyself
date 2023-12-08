"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";
import { deleteNote, updateNote } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";


type Props = {
    note: Note;
    handleAddNote: Function
    setViewedNote: Function;
    handleDeleteNode: Function;
    display: string;
    setEditorVisible: Function;
    titleRef: React.RefObject<HTMLInputElement>;
};

function NoteViewer({ note, handleAddNote, setViewedNote, handleDeleteNode, display, setEditorVisible, titleRef }: Props) {

    console.log(display);

    const [title, setTitle] = useState("")
    const [content , setContent] = useState("");
    const [date, setDate] = useState(new Date());
    const {user} = useUserAuth(); 
    function formatDate(date: Date) {
        return date.toISOString().split('T')[0];
    }

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
                setDate(new Date()); 
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
        setDate(new Date(event.currentTarget.value));
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

    function del() {
        if(note) {
            deleteNote(user, note);
            setViewedNote(null);
            setTitle("");
            setContent("");
            setDate(new Date()); 
            handleDeleteNode(note);
        }
    }





  return (
    <div className={"flex-row gap-6 justify-center py-10 bg-base-300 " + `${display}`}>
      <div  className="flex flex-col gap-3 ">
        <div className="flex flex-row justify-between ">
          <input ref={titleRef} className="input input-bordered input-sm  max-w-xs" value={title} placeholder="Title" required={true} onChange={(e) => handleTitleChange(e)}></input>
          <input type="date" className="input input-bordered input-sm " value={formatDate(date)} placeholder="Date" onChange={(e) => handleDateChange(e)}></input>
        </div>
       <textarea style={{minHeight: "25vh",minWidth:"50vw" }} className="textarea textarea-bordered textarea-lg w-full " placeholder="New Note" onChange={(e) => handleContentChange(e)} value={content}></textarea>
      
      </div>
    
      <div className="py-2 flex flex-col justify-center gap-3">
        <Button className="btn btn-outline btn-accent" title="Save" func={save}></Button>
        <Button className="btn btn-outline btn-error" title="Delete" func={() => del()}></Button>
        {/* <Button title="Hide" func={() => setEditorVisible(false)}/> */}
      </div>
    </div>
  );
}

export default NoteViewer;
