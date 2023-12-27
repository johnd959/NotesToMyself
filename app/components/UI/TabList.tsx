import { Note } from "@/app/Types/Note";
import React from "react";
import Notestab from "../Notes/Notestab";
import AddNote from "./AddNote";
import { maxHeaderSize } from "http";

type Props = {
  notes: Note[],
  handleSetViewedNote: Function,
  handleDeleteAllNotes: () => void,
  viewedNote:Note,
};


function TabList({ notes, handleSetViewedNote, viewedNote}: Props) {
  return (
    <ul className={"flex flex-1 p-5 max-w-full flex-col md:flex-row items-center gap-6 w-screen flex-wrap"}
    >
      {notes.length > 0 ? 
        notes.map((Note) => 
            <Notestab
            viewedNote={viewedNote}
              note={Note}
              onSetViewedNote={handleSetViewedNote}
              key={Note.id}
            ></Notestab>
      ) : (
        null
      )}
    </ul>
  );
}


export default TabList;
