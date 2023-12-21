"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import NotesScroll from "../components/UI/NotesScroll";
import { Note } from "../Types/Note";
import { Folder } from "../Types/Folder";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { RedirectType, redirect } from "next/navigation";
import { VscMenu } from "react-icons/vsc";
import {
  createNote,
  getNotes,
  deleteAllNotes,
  getFolders,
  deleteFolder,
  updateFolder,
} from "../_services/notes-service";
import Button from "../components/UI/Button";
import Sidebar from "../components/UI/Sidebar";
import { useNotesContext } from "../_utils/note-context";
import {useFoldersContext} from '../_utils/folder-context'

export default function NotesPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const {notes, setNotes, handleSearchNotes, handleAddNote, endFilter, viewedNote, setViewedNote} = useNotesContext();
  const {selectedFolder} = useFoldersContext(); 
  const [editorVisible, setEditorVisible] = useState(true);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDrawerClosed, setDrawerClosed] = useState(false); 
  const [folderName, setFoldername] = useState("");
  const [nameChange, setNameChange] = useState(false); 

  function handleSetViewedNote(note: Note) {
    setViewedNote(note);
    setEditorVisible(true);
  }

  const badgeRef = useRef<HTMLInputElement>(null);

  const focusTitleInput = () => {
    badgeRef.current?.focus(); 
  };

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
    handleSearchNotes(searchedTitle); 
    setIsSearchActive(true);
    const modal = document.getElementById("my_modal_4");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  }
  function handleEndSearch() {
    endFilter(); 
    setIsSearchActive(false);
    setSearchedTitle("");
  }

  function toggleDrawer(){
    if(isDrawerClosed){
      setDrawerClosed(false);
    }else{
      setDrawerClosed(true); 
    }
  }

  function handleFolderNameChange(){
    if(selectedFolder){
    setNameChange(true); 
    setFoldername(selectedFolder.name);     
    }

  }
  function handleFolderName(e:ChangeEvent<HTMLInputElement>){
    setFoldername(e.currentTarget.value); 
  }

  function handleSave(){
    if(selectedFolder.name !== folderName){
      selectedFolder.name = folderName.trim(); 
      updateFolder(user, selectedFolder); 
    }
    setFoldername("");
    setNameChange(false); 
  }
  
  useEffect(
    () => {
      if (nameChange && badgeRef.current){focusTitleInput();}
    },
    [nameChange]
  )
 
  if (user) { 
    return (
      <main className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerClosed} onChange={() => toggleDrawer()} />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-black px-5">
            <div className="flex-1 flex flex-row gap-2 items-center">
              <label htmlFor="my-drawer" className="bg-inherit border-none rounded-md transition-colors cursor-pointer hover:bg-primary ease-in-out duration-300">
                <VscMenu color="white" size={25} />
              </label>
              <a className=" text-xl text-white cursor-default">Notes to Myself</a>
              {nameChange != true? <div className={selectedFolder? "tooltip tooltip-right": ""} data-tip="Edit folder name" ><div className="badge badge-primary rounded-md cursor-text" onClick={handleFolderNameChange}>{selectedFolder? selectedFolder.name : "All Notes"}</div></div> : <input ref={badgeRef} className="badge badge-primary rounded-md" onBlur={handleSave} value={folderName} onChange={(e) => handleFolderName(e)}></input>}
            </div>
            <div className="md:flex flex-row gap-2 hidden">
              {/* <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Who shot first?
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select> */}
              {isSearchActive && (
                <button
                  className="btn btn-outline btn-error"
                  onClick={handleEndSearch}
                >
                  End Search
                </button>
              )}
              {!isSearchActive && (
                <button
                  className="btn btn-primary"
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
                      className="btn btn-primary"
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
                      className="btn btn-primary"
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
            </div>
          </div>
          <NotesScroll
            scroll={editorVisible? "overflow-y-scroll" : "overflow-y-scroll"}
            handleSetViewedNote={handleSetViewedNote}
            handleDeleteAllNotes={handleOpenDeleteModel}
            height={editorVisible == true ? "50vh" : "100vh"}
          ></NotesScroll>
          {editorVisible == true ? (
            <Button
              className="sticky rounded-none bottom-0 bg-base-300 btn btn-outline btn-primary"
              title="Show More"
              func={() => setEditorVisible(false)}
            ></Button>
          ) : (
            <></>
          )}
          <section>
            <NoteViewer
              display={editorVisible == true ? "flex" : "hidden"}
            ></NoteViewer>
          </section>
          {editorVisible == false ? (
            <Button
              className="sticky bottom-0 btn btn-primary"
              title="Edit Notes"
              func={() => setEditorVisible(true)}
            ></Button>
          ) : (
            <></>
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar
          toggleDrawer={toggleDrawer}
          ></Sidebar>
        </div>
      </main>
    );
  } else {
    redirect("/", RedirectType.push);
  }
}
