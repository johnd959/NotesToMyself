import React from "react";
import { Note } from "@/app/Types/Note";

type Props = {
  handleAddNewNote: () => void;
  handleDeleteAllNotes: () => void;
};

function AddNote({ handleAddNewNote, handleDeleteAllNotes }: Props) {
  return (
    <div>
      <li
        style={{ minWidth: "27.6vh", minHeight: "24.5vh", flex: 0 }}
        className="btn btn-active btn-accent rounded-large mx-2 flex flex-col justify-between p-5"
        onClick={handleAddNewNote}
      >
        <div
          style={{ minHeight: "20vh", maxWidth: "14vw" }}
          className="flex flex-col justify-center items-center  px-4 pt-5 text-2xl"
        >
          Add a note
        </div>
      </li>
      <li
        style={{ minWidth: "27.6vh", minHeight: "24.5vh", flex: 0 }}
        className="btn btn-active btn-error rounded-large mx-2 flex flex-col justify-between p-5"
        onClick={handleDeleteAllNotes}
      >
        <div
          style={{ minHeight: "20vh", maxWidth: "14vw" }}
          className="flex flex-col justify-center items-center px-4 pt-5 text-2xl"
        >
          Delete all notes
        </div>
      </li>
    </div>
  );
}

export default AddNote;
