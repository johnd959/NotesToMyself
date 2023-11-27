"use client";

import React from "react";
import { Note } from "@/app/Types/Note";
import Button from "./Button";

type Props = {
  note: Note;
};

function NoteViewer(props: Props) {
  return (
    <div>
      <div className="flex flex-col bg-white">
        <div className="flex flex-row justify-between">
          <h2>{props.note.title}</h2>
          <h2>{props.note.date}</h2>
        </div>
        <p>{props.note.content}</p>
      </div>
      <div className="py-2 flex flex-row justify-end gap-2">
        <Button title="Delete" func={() => alert("Notes deleted")}></Button>
        <Button title="Save" func={() => alert("Hello")}></Button>
      </div>
    </div>
  );
}

export default NoteViewer;
