"use client";

import { useEffect, useState, useRef } from "react";
import NotesScroll from "../components/UI/NotesScroll";
import { Note } from "../Types/Note";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { RedirectType, redirect } from "next/navigation";
import { createNote, getNotes, deleteAllNotes } from "../_services/notes-service";
import Button from "../components/UI/Button";



export default function NotesPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  let noteList: Note[] = [];
  const [notes, setNotes] = useState(noteList);
  let tempNote: Note = {
    id: "",
    title: "",
    content: "",
    date: new Date(),
  }; //temp fix
  const [viewedNote, setViewedNote] = useState(tempNote);
  const [editorVisible, setEditorVisible] = useState(true);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  async function loadAndSetFirstNote() {
    try {
      let items = await getNotes(user);
      items.sort((a, b) => b.date.getTime() - a.date.getTime());
      setNotes(items);

      if (items.length > 0) {
        setViewedNote(items[0]);
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  useEffect(() => {
    loadAndSetFirstNote();
  }, [user]);

  function handleSetViewedNote(note: Note) {
    setViewedNote(note);
    setEditorVisible(true);
  }

  async function handleAddNote(note: Note) {
    let id = await createNote(user, note);
    if (id) {
      note.id = id;
    }

    let newNotes = [...notes, note];

    newNotes.sort((a, b) => b.date.getTime() - a.date.getTime());

    setNotes(newNotes);

    setViewedNote(note);
  }


  function handleDeleteNote(note: Note) {
    setNotes(notes.filter((item: Note) => item.id != note.id));
  }

  const titleRef = useRef<HTMLInputElement>(null);

  const focusTitleInput = () => {
    titleRef.current?.focus();
  };
  function handleAddNewNote() {
    setViewedNote(tempNote);
    setEditorVisible(true);
    focusTitleInput();
  }
  function handleOpenDeleteModel() {
    const modal = document.getElementById("my_modal_5");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  }
  function handleDeleteAllNotes() {
    setNotes([]);
    const modal = document.getElementById("my_modal_5");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
    deleteAllNotes(user);
  }

  function handleSearchTitle(event: React.FormEvent<HTMLInputElement>) {
    setSearchedTitle(event.currentTarget.value);
  }
  function handleSearchNote() {
    setNotes((previousNotes) => {
      return previousNotes.filter((note) =>
        note.title.toLowerCase().includes(searchedTitle.toLowerCase())
      );
    });
    setIsSearchActive(true);
    const modal = document.getElementById("my_modal_4");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  }
  function handleEndSearch() {
    loadAndSetFirstNote();
    setIsSearchActive(false);
    setSearchedTitle("");
  }


  if (user) {
    return (
      <main className="flex flex-col justify-between min-h-screen">
        <div className="navbar bg-black px-5">
          <div className="flex-1">
            <a className=" text-xl text-white ">Notes to Myself</a>
          </div>
          <div className="flex-none">
            {isSearchActive && (
              <button
                className="btn btn-outline btn-error mr-4"
                onClick={handleEndSearch}
              >
                End Search
              </button>
            )}
            {!isSearchActive && (
              <button
                className="btn btn-accent mr-3"
                onClick={() => {
                  const modal = document.getElementById("my_modal_4");
                  if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                  }
                }}
              >
                Search Note
              </button>
            )}
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box flex flex-row items-center space-x-28">
                <input
                  type="text"
                  value={searchedTitle}
                  onChange={handleSearchTitle}
                  className="input input-bordered input-sm  max-w-xs"
                  placeholder="Enter note title"
                ></input>
                <div className="flex flex-row space-x-3">
                  <button
                    className="btn btn-accent"
                    onClick={handleSearchNote}
                  >
                    Search
                  </button>

                  <button
                    className="btn btn-error"
                    onClick={() => {
                      const modal = document.getElementById("my_modal_4");
                      if (modal instanceof HTMLDialogElement) {
                        modal.close();
                      }
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
            <dialog id="my_modal_5" className="modal">
              <div className="modal-box flex flex-row items-center space-x-48">
                <div>Delete all notes?</div>
                <div className="flex flex-row space-x-3">
                  <button
                    className="btn btn-error"
                    onClick={handleDeleteAllNotes}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-accent"
                    onClick={() => {
                      const modal = document.getElementById("my_modal_5");
                      if (modal instanceof HTMLDialogElement) {
                        modal.close();
                      }
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
            <Button
              className="btn btn-accent"
              title="Sign Out"
              func={() => firebaseSignOut()}
            ></Button>
          </div>
        </div>
        <NotesScroll
          flex={editorVisible == true ? "" : "flex-wrap"}
          scroll={
            editorVisible == true ? "overflow-x-scroll" : "overflow-y-scroll"
          }
          notes={notes}
          handleSetViewedNote={handleSetViewedNote}
          handleAddNewNote={handleAddNewNote}
          handleDeleteAllNotes={handleOpenDeleteModel}
          height={editorVisible == true ? "54vh" : "85vh"}
        ></NotesScroll>
          {editorVisible == true ? (
          <Button
            className="sticky rounded-none bottom-0 bg-base-300 btn btn-outline btn-accent"
            title="Show More"
            func={() => setEditorVisible(false)}
          ></Button>
        ) : (
          <></>
        )}
        <section style={{ maxHeight: "40vh"}}>
          <NoteViewer
            setEditorVisible={setEditorVisible}
            display={editorVisible == true ? "flex" : "hidden"}
            note={viewedNote}
            handleAddNote={handleAddNote}
            setViewedNote={setViewedNote}
            handleDeleteNode={handleDeleteNote}
            titleRef={titleRef}
          ></NoteViewer>
        </section>
        {editorVisible == false ? (
          <Button
            className="sticky bottom-0 btn btn-accent"
            title="Edit Notes"
            func={() => setEditorVisible(true)}
          ></Button>
        ) : (
          <></>
        )}
      </main>
    );
  } else {
    redirect("/", RedirectType.push);
  }
}
