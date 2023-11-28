"use client"; 

import Image from "next/image";
import NoteViewer from "./components/UI/NoteViewer";
import { Note } from "./Types/Note";
import { useState } from "react";
import Sidebar from "./components/UI/Sidebar";
import { useUserAuth } from "./_utils/auth-context";
import Button from "./components/UI/Button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function signIn()
  {
    try{
      await gitHubSignIn();
    }
    catch(ex : any)
    {
      console.error(ex); 
    }
  }

  

  if(user)
  {
    console.log(user?.displayName + " " + user?.uid);
    redirect("/notes", 'push'); 
  }
  else
  {
    return(
      <main className="flex flex-col justify-center items-center w-screen h-screen">
        <div>
          <Button title="Sign In With GitHub" func={() => signIn()}></Button>
        </div>
      </main>
    )
  }


}
