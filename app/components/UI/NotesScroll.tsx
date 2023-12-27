import React, { Children } from "react";
import TabList from "./TabList";
import { Note } from "../../Types/Note";
import RootLayout from "@/app/layout";
import Button from "./Button";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useNotesContext } from "@/app/_utils/note-context";

type Props = {
  handleSetViewedNote: Function,
  handleDeleteAllNotes: () => void,
  height: String,
  scroll: String,
  viewedNote: Note,
};

function Sidebar({
  handleSetViewedNote,
  handleDeleteAllNotes,
  height,
  scroll,
  viewedNote
}: Props) {
  const { firebaseSignOut } = useUserAuth();
  const {notes}:{notes:Note[]} = useNotesContext(); 

  return (
    <div
      style={{ minHeight: `${height}`, maxHeight: `${height}`}}
      className={
        "bg-neutral-content w-screen min-w-fit " + `${scroll}`
      }
    >
      <TabList
        viewedNote={viewedNote}
        handleSetViewedNote={handleSetViewedNote}
        handleDeleteAllNotes={handleDeleteAllNotes}
        notes={notes}
      ></TabList>
    </div>
  );
}

export default Sidebar;
