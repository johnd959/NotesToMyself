import React, { Children } from "react";
import TabList from "./TabList";
import { Note } from "../../Types/Note";
import RootLayout from "@/app/layout";
import Button from "./Button";
import { useUserAuth } from "@/app/_utils/auth-context";

type Props = {
  notes: Note[],
  handleSetViewedNote: Function,
  handleAddNewNote: () => void,
  handleDeleteAllNotes: () => void,
  height: String,
  scroll: String,
};

function Sidebar({
  notes,
  handleSetViewedNote,
  handleAddNewNote,
  handleDeleteAllNotes,
  height,
  scroll
}: Props) {
  const { firebaseSignOut } = useUserAuth();

  return (
    <div
      style={{ minHeight: `${height}`, maxHeight: `${height}`}}
      className={
        "bg-neutral-content w-screen min-w-fit " + `${scroll}`
      }
    >
      <TabList
        handleAddNewNote={handleAddNewNote}
        handleSetViewedNote={handleSetViewedNote}
        handleDeleteAllNotes={handleDeleteAllNotes}
        notes={notes}
      ></TabList>
    </div>
  );
}

export default Sidebar;
