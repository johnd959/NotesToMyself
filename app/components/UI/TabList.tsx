import { Note } from "@/app/Types/Note";
import React from "react";
import Notestab from "../Notes/Notestab";

type Props = {
  notes: Note[];
  handleSetViewedNote: Function;
  flex: String
};

function TabList({ notes, handleSetViewedNote, flex }: Props) {
  return (
    <ul style={{maxWidth: "95%",}}className={"flex flex-1 flex-row gap-2 " + `${flex}`}>
      {notes.length > 0 ? 
        notes.map((Note) => 
            <Notestab
              note={Note}
              onSetViewedNote={handleSetViewedNote}
              key={Note.id}
            ></Notestab>
      ) : (
        <h2>Add a note</h2>
      )}
    </ul>
  );
}


export default TabList;
