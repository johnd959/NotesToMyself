import React from "react";
import { Note } from "@/app/Types/Note";

type Props = {
  note: Note;
  onSetViewedNote: Function;
};

function Notestab({ note, onSetViewedNote }: Props) {
  return (
    <li
      className="btn rounded-large flex flex-col justify-center p-2 w-60 h-72"
      onClick={() => onSetViewedNote(note)}
    >
      <div className="">
        <h2 className="pb-2 text-lg h-16">
        {note.title.length > 25
        ? note.title.substring(0, 25) + "..."
        : note.title}
        </h2>
        <p style={{wordBreak: "break-word", scrollbarWidth: 'thin'}} className="flex flex-wrap text-lg text-left h-44 overflow-y-auto">{note.content}</p>
      </div>
      <div>
      <p>{note.date.toLocaleDateString()}</p>
      </div>
    </li>
  );
}

export default Notestab;
