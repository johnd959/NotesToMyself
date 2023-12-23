"use client";

import { useState, useEffect, ChangeEvent } from "react";
import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";
import { deleteNote, updateNote } from "@/app/_services/notes-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import { Folder } from "@/app/Types/Folder";
import { useNotesContext } from "@/app/_utils/note-context";
import { useFoldersContext } from "@/app/_utils/folder-context";

type Props = {
  display: string,
};

function NoteViewer({ display }: Props) {
  const { viewedNote, setViewedNote } = useNotesContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [folder, setFolder]: [string, Function] = useState("");
  const {folders, selectedFolder} = useFoldersContext(); 
  const { user } = useUserAuth();
  const { handleAddNote, handleDeleteNote } = useNotesContext();
  function formatDate(date: Date) {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (viewedNote) {
      setTitle(viewedNote.title);
      setContent(viewedNote.content);
      setDate(viewedNote.date);
      if (viewedNote.folder) {
        setFolder(viewedNote.folder);
      } else {
        setFolder("");
      }
    } else {
      setTitle("");
      setContent("");
      setDate(new Date());
    }
  }, [viewedNote]);

  useEffect(
    () => {
      setTitle("");
      setContent("");
      setDate(new Date());
      setFolder(selectedFolder?.id);
    },
    [selectedFolder]
  )

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
  function handleFolderSelect(e: ChangeEvent<HTMLSelectElement>) {
    setFolder(e.currentTarget.value);
  }

  function save() {
    if (
      viewedNote != null &&
      (viewedNote.title != title ||
        viewedNote.content != content ||
        viewedNote.date != date ||
        viewedNote.folder != folder)
    ) {
      viewedNote.title = title;
      viewedNote.content = content;
      viewedNote.date = date;
      viewedNote.folder = folder;
      updateNote(user, viewedNote);
      handleDeselect();
    } else if (viewedNote == null) {
      if (title !== "") {
        handleAddNote({
          title: title,
          content: content,
          date: date,
          folder: folder,
        });
      } else {
        alert("No note was created, please add a title at the least");
      }
    }
      setTitle("");
      setContent("");
      setDate(new Date());
      handleDeselect();
  }

  function del() {
    if (viewedNote) {
      handleDeleteNote(viewedNote);
      setViewedNote(null);
      setTitle("");
      setContent("");
      setDate(new Date());
      setFolder("");
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
        <select
          className="select select-bordered max-w-xs md:max-w-none"
          value={folder}
          onChange={(e) => handleFolderSelect(e)}
        >
          {folders.length > 0 &&
            folders.map((folder:Folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          <option value="">Select a Folder</option>
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
          className="btn btn-outline btn-primary max-w-xs md:max-w-none flex-1"
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
