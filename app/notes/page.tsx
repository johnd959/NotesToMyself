"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import NotesScroll from "../components/UI/NotesScroll";
import { Note } from "../Types/Note";
import { Folder } from "../Types/Folder";
import { useUserAuth } from "../_utils/auth-context";
import NoteViewer from "../components/UI/NoteViewer";
import { RedirectType, redirect } from "next/navigation";
import { VscClose, VscEdit, VscMenu } from "react-icons/vsc";
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
import { useFoldersContext } from "../_utils/folder-context";
import IconButton from "../components/UI/IconButton";
import Confirm from "../components/UI/Confirm";


export default function NotesPage() {
  const { user} = useUserAuth();
  const {
    setNotes,
    handleSearchNotes,
    endFilter,
    setViewedNote,
    viewedNote,
    handleDeleteNote,
  } = useNotesContext();
  const { selectedFolder, setSelectedFolder, handleDeleteFolder } = useFoldersContext();
  const [editorVisible, setEditorVisible] = useState(true);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDrawerClosed, setDrawerClosed] = useState(false);
  const [folderName, setFoldername] = useState("");
  const [nameChange, setNameChange] = useState(false);
  const del = {
    message: "NA",
    func: () => {}, 
  }
  const [delOp, setDelOp] = useState(del); 


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

  function deleteNote(){
    const modal = document.getElementById("delOpModal");
    setDelOp({
      message: `Delete note: ${viewedNote.title}?`,
      func: () => {
        handleDeleteNote(viewedNote); 
        setDelOp(del); 
        if (modal instanceof HTMLDialogElement){
          modal.close(); 
        }
      }
    })
    if (modal instanceof HTMLDialogElement){
      modal.showModal()
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
    endFilter(selectedFolder);
    setIsSearchActive(false);
    setSearchedTitle("");
  }

  function toggleDrawer() {
    if (isDrawerClosed) {
      setDrawerClosed(false);
    } else {
      setDrawerClosed(true);
    }
  }

  function handleFolderNameChange() {
    if (selectedFolder) {
      setNameChange(true);
      setFoldername(selectedFolder.name);
    }
  }
  function handleFolderName(e: ChangeEvent<HTMLInputElement>) {
    setFoldername(e.currentTarget.value);
  }

  function handleSave() {
    if (selectedFolder.name !== folderName) {
      selectedFolder.name = folderName.trim();
      updateFolder(user, selectedFolder);
    }
    setFoldername("");
    setNameChange(false);
  }

  useEffect(() => {
    if (nameChange && badgeRef.current) {
      focusTitleInput();
    }
  }, [nameChange]);

  if (user) {
    return (
      <main className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerClosed}
          onChange={() => toggleDrawer()}
        />
        <div className="drawer-content flex flex-col">
          <div className="flex justify-between py-2 bg-black px-5">
            <div className="flex-1 flex flex-row gap-2 items-center w-4/12">
              <label
                htmlFor="my-drawer"
                className="bg-inherit border-none rounded-md transition-colors cursor-pointer hover:bg-primary ease-in-out duration-300"
              >
                <VscMenu color="white" size={25} />
              </label>
              <a className=" text-lg text-white cursor-default hidden md:block md:text-xl">
                Notes to Myself
              </a>
            </div>
            <div className={"flex items-center justify-end sm:justify-center w-8/12 sm:w-4/12 join  " + `${isSearchActive? "hidden" : ""}`}>
              {nameChange != true ? (
                  <div className="btn btn-primary rounded-md cursor-default join-item">
                    {selectedFolder ? selectedFolder.name.substr(0, 20) : "All Notes"}
                  </div>
              ) : (
                <input
                  type="text"
                  size={20}
                  ref={badgeRef}
                  className="input input-md bg-primary text-white join-item rounded-lg"
                  onBlur={handleSave}
                  value={folderName}
                  onChange={(e) => handleFolderName(e)}
                ></input>
              )}
              <div className={"flex " +
                  `${!nameChange && selectedFolder ? "" : "hidden"}`}>
                <Button
                className={
                  "join-item rounded-md btn-primary"
                }
                func={() => handleFolderNameChange()}
                Icon={VscEdit}
                iconSize={20}
              ></Button>
              <Button
                className="join-item btn-primary"
                func={() => {endFilter(); setSelectedFolder(null)}}
                Icon={VscClose}
              />                
              </div>
              
            </div>
            <div className={"flex-row gap-2 w-4/12 justify-end sm:flex " + `${!isSearchActive? "hidden" : ""}`}>
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
                  className="btn btn-primary hidden md:block"
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
            </div>
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box flex flex-row items-center gap-2">
                <input
                  type="text"
                  value={searchedTitle}
                  onChange={handleSearchTitle}
                  className="input input-bordered input-sm w-full"
                  placeholder={`Search in: ${selectedFolder? selectedFolder.name : "All notes"}`}
                ></input>
                <div className="flex flex-row items-center justify-end w-full gap-2">
                <Button
                    className="btn btn-error"
                    title="Cancel"
                    func={() => {
                      const modal = document.getElementById("my_modal_4");
                      if (modal instanceof HTMLDialogElement) {
                        modal.close();
                      }
                    }}
                  />
                  <Button
                  title="Search"
                    className="btn btn-primary"
                    func={handleSearchNote}
                  />
                </div>
              </div>
            </dialog>
            <Confirm
            modalID="delOpModal"
            message={delOp.message}
            actions={[{
              name:"Delete",
              action: () => delOp.func()
            }]}
            >
            </Confirm>
          </div>
          <NotesScroll
            viewedNote={viewedNote}
            scroll={editorVisible ? "overflow-y-scroll" : "overflow-y-scroll"}
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
            handleDeleteNote={deleteNote}
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
          <Sidebar setDelOp={setDelOp} toggleDrawer={toggleDrawer}></Sidebar>
        </div>
      </main>
    );
  } else {
    redirect("/", RedirectType.push);
  }
}
