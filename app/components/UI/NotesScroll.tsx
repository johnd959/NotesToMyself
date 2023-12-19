import React, { Children } from "react";
import TabList from "./TabList";
import { Note } from "../../Types/Note";
import RootLayout from "@/app/layout";
import Button from "./Button";
import { useUserAuth } from "@/app/_utils/auth-context";

type Props = {
  notes: Note[];
  handleSetViewedNote: Function;
  handleAddNewNote: () => void;
  handleDeleteAllNotes: () => void;
  height: String;
  scroll: String;
  flex: String;
};

function Sidebar({
  notes,
  handleSetViewedNote,
  handleAddNewNote,
  handleDeleteAllNotes,
  height,
  scroll,
  flex,
}: Props) {
  const { firebaseSignOut } = useUserAuth();

  return (
    <div
      style={{ minHeight: `${height}`}}
      className={
        "bg-neutral-content w-screen min-w-fit flex flex-row p-5 justify-center " + `${scroll}`
      }
    >
      <TabList
        flex={flex}
        handleAddNewNote={handleAddNewNote}
        handleSetViewedNote={handleSetViewedNote}
        handleDeleteAllNotes={handleDeleteAllNotes}
        notes={notes}
      ></TabList>
    </div>
  );
}

export default Sidebar;
