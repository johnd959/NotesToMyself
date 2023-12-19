import React from "react";
import { Note } from "@/app/Types/Note";

type Props = {
  note: Note;
  onSetViewedNote: Function;
};

function Notestab({ note, onSetViewedNote }: Props) {
  return (
    <li
      className="btn rounded-large flex flex-col justify-between p-2 w-60 h-60"
      onClick={() => onSetViewedNote(note)}
    >
      <div className="">
        <h2 className="pb-2 text-lg">
        {note.title.length > 25
        ? note.title.substring(0, 25) + "..."
        : note.title}
        </h2>
        <p style={{wordBreak: "break-word"}} className="flex flex-wrap text-left">{note.content}</p>
      </div>
      <div>
      <p>{note.date.toLocaleDateString()}</p>
      </div>
    </li>
  );
}

export default Notestab;
