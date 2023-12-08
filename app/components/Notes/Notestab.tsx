import React from "react";
import { Note } from "@/app/Types/Note";

type Props = {
  note: Note;
  onSetViewedNote: Function;
};

function Notestab({ note, onSetViewedNote }: Props) {
  return (
    <li
      style={{ minWidth: "15%", minHeight: "47vh", flex: 0 }}
      className="btn rounded-large mx-2 flex flex-col justify-between"
      onClick={() => onSetViewedNote(note)}
    >
      <div className="flex flex-col items-center p-2 pt-5">
        <div style={{ minHeight: "5vh" }}>
          <h2 className="text-left font-bold text-base">
            {note.title.length > 25
              ? note.title.substring(0, 25) + "..."
              : note.title}
          </h2>
        </div>
        <div style={{ minHeight: "35vh", maxWidth: "14vw" }}>
          <p
            style={{
              minHeight: "35vh",
              maxHeight: "35vh",
              maxWidth: "14vw",
              wordBreak: "break-word",
            }}
            className="flex flex-wrap text-left"
          >
            {note.content}
          </p>
            <p>{note.date.toLocaleDateString()}</p>
        </div>
      </div>
    </li>
  );
}

export default Notestab;
