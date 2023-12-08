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


function TabList({ notes, handleSetViewedNote, handleAddNewNote, handleDeleteAllNotes, flex}: Props) {
  return (
    <ul style={{maxWidth: "95%",}}className={"flex flex-1 flex-row gap-2 " + `${flex}`}>
      <AddNote  handleAddNewNote={handleAddNewNote} handleDeleteAllNotes={handleDeleteAllNotes}/>
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
