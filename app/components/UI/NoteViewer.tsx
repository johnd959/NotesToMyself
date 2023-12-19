"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";
import { deleteNote, updateNote } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import { Folder } from "@/app/Types/Folder";

type Props = {
  note: Note;
  handleAddNote: Function;
  setViewedNote: Function;
  setEditorVisible: Function,
  handleDeleteNode: Function;
  display: string;
  folders: Folder[],
  titleRef: React.RefObject<HTMLInputElement>;
};

function NoteViewer({
  note,
  handleAddNote,
  setViewedNote,
  handleDeleteNode,
  setEditorVisible,
  display,
  folders,
  titleRef,
}: Props) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [folder, setFolder]:[string, Function] = useState(""); 
  const { user } = useUserAuth();
  function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setDate(note.date);
      if(note.folder){
        setFolder(note.folder);         
      }
      else{
        setFolder(""); 
      }
    } else {
      setTitle("");
      setContent("");
      setDate(new Date());
      setFolder("");
    }
  }, [note]);

  function handleContentChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setContent(event.currentTarget.value);
  }
  function handleTitleChange(event: React.FormEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }
  function handleDateChange(event: React.FormEvent<HTMLInputElement>) {
    setDate(new Date(event.currentTarget.value));
  }
  function handleDeselect() {
    setViewedNote();
  }
  function handleFolderSelect(e:ChangeEvent<HTMLSelectElement>){
    setFolder(e.currentTarget.value); 
  }

  function save() {
    if (note && note.id) {
      note.title = title;
      note.content = content;
      note.date = date;
      note.folder = folder; 
      updateNote(user, note);
    } else {
      handleAddNote({
        title: title,
        content: content,
        date: date,
        folder: folder,
      });
    }
    handleDeselect();
  }

  function del() {
    if (note) {
      deleteNote(user, note);
      setViewedNote(null);
      setTitle("");
      setContent("");
      setDate(new Date());
      handleDeleteNode(note);
    }
  }

  return (
    <div
      className={
        "gap-3 p-4 transition-all max-w-full flex-col sm:flex-row " +
        `${display}`
      }
    >
      <div className="flex flex-col gap-2">
        <input
          type="text"
          ref={titleRef}
          className="input input-bordered max-w-xs md:max-w-none"
          value={title}
          placeholder="Title"
          required={true}
          onChange={(e) => handleTitleChange(e)}
        ></input>
        <input
          type="date"
          className="input input-bordered max-w-xs md:max-w-none"
          value={formatDate(date)}
          placeholder="Date"
          onChange={(e) => handleDateChange(e)}
        ></input>
        <select className="select select-bordered max-w-xs md:max-w-none" value={folder} onChange={(e) => handleFolderSelect(e)}>
            {folders.length > 0 && folders.map((folder) => <option value={folder.id}>{folder.name}</option>)}
            <option value="">None</option>
        </select>
      </div>
      <textarea
        className="textarea textarea-bordered textarea-lg w-full max-w-xs md:max-w-none"
        placeholder="New Note"
        onChange={(e) => handleContentChange(e)}
        value={content}
      ></textarea>
      <div className="flex flex-row sm:flex-col justify-center sm:justify-start gap-2 ">
      <Button
        className="btn btn-outline btn-accent max-w-xs md:max-w-none flex-1"
        title="Save"
        func={save}
      ></Button>
      <Button
        className="btn btn-outline btn-error max-w-xs md:max-w-none flex-1"
        title="Delete"
        func={() => del()}
      ></Button>
      {/* <Button title="Hide" func={() => setEditorVisible(false)}/> */}        
      </div>
    </div>
  );
}

export default NoteViewer;
