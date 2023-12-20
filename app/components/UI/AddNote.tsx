import React from "react";
import { Note } from "@/app/Types/Note";
import { Butcherman } from "next/font/google";
import Button from '../UI/Button';

type Props = {
  handleAddNewNote: () => void;
  handleDeleteAllNotes: () => void;
};

function AddNote({ handleAddNewNote, handleDeleteAllNotes }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* <li
        style={{ minWidth: "27.6vh", minHeight: "24.5vh", flex: 0 }}
        className="btn btn-active btn-primary rounded-large mx-2 flex flex-col justify-between p-5"
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
      </li> */}
      <Button className="btn-primary" title="Add a note" func={handleAddNewNote}></Button>
      <Button className="btn-error" title="Delete all notes" func={handleDeleteAllNotes}></Button>
    </div>
  );
}

export default AddNote;
