import { Note } from "@/app/Types/Note";
import React from "react";
import Notestab from "../Notes/Notestab";
import AddNote from "./AddNote";

type Props = {
  notes: Note[];
  handleSetViewedNote: Function;
  handleAddNewNote: () => void;
  handleDeleteAllNotes: () => void;
  flex: String
};


function TabList({ notes, handleSetViewedNote, flex}: Props) {
  return (
    <ul className={"flex flex-1 flex-row gap-6 flex-wrap md:flex-nowrap " + `${flex}`}>
      {notes.length > 0 ? 
        notes.map((Note) => 
            <Notestab
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
