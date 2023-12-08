"use client"; 

import Image from "next/image";
import NoteViewer from "./components/UI/NoteViewer";
import { Note } from "./Types/Note";
import { useState } from "react";
import Sidebar from "./components/UI/NotesScroll";
import { useUserAuth } from "./_utils/auth-context";
import Button from "./components/UI/Button";
import { RedirectType, redirect } from "next/navigation";
import Link from "next/link";
import { VscGithubAlt } from "react-icons/vsc";
import { FaGoogle } from "react-icons/fa";

export default function Home() {


  const {emailSignIn} = useUserAuth(); 
  const { user, gitHubSignIn, firebaseSignOut} = useUserAuth();

  async function signInWithGitHub()
  {
    try{
      await gitHubSignIn();
    }
    catch(ex : any)
    {
      console.error(ex); 
    }
  }

  async function signInWithEmail()
  {
    try{
      await emailSignIn();
    }
    catch(ex : any)
    {
      console.error(ex); 
    }
  }

  

  if(user)
  {
    console.log("User: " + user?.displayName);
    redirect("/notes", RedirectType.push); 
    return(
      <Link href="/notes">Click if redirect does not work</Link>
    )
  }
  else
  {
    return(
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div style={{minHeight: "40vh", minWidth: "20vw"}} className="flex flex-col justify-center gap-2 bg-black px-10 rounded-xl">
          <h1 className="text-white text-center">Notes to Myself</h1>
          <Button icon={VscGithubAlt} className="btn-accent" title="Continue with GitHub" func={() => signInWithGitHub()}></Button>
          <Button icon={FaGoogle} className="btn-accent" title="Continue with Google" func={() => emailSignIn()}></Button>
        </div>
      </main>
    )
  }


}
