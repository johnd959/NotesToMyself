"use client"; 

import Image from "next/image";
import NoteViewer from "./components/UI/NoteViewer";
import { Note } from "./Types/Note";
import { useState } from "react";
import Sidebar from "./components/UI/Sidebar";
import { useUserAuth } from "./_utils/auth-context";
import Button from "./components/UI/Button";
import { RedirectType, redirect } from "next/navigation";
import Link from "next/link";

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
        <div className="flex flex-col gap-2">
          <Button title="Sign In With GitHub" func={() => signInWithGitHub()}></Button>
        </div>
      </main>
    )
  }


}
