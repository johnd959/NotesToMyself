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
  const { user, gitHubSignIn, firebaseSignOut, signIn} = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

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
        <div className="flex flex-col justify-center gap-2 bg-black p-10 rounded-xl">
          <h1 className="text-center text-white mb-5 text-lg">Notes to Myself</h1>
          <div className="flex flex-col gap-2 items-center">
            <input type="email" placeholder="Email" className="input input-sm" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" placeholder="Password" className="input input-sm" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <Button className="btn btn-primary px-6" title="Sign In" func={() => signIn(email, password)}></Button>
          </div>
          <div className="flex flex-row items-center">
            <hr className="text-white w-6/12"/>
            <p className="text-white mx-2">Or</p>
            <hr className="text-white w-6/12"></hr>            
          </div>
          <Button icon={VscGithubAlt} className="btn-primary" title="Continue with GitHub" func={() => signInWithGitHub()}></Button>
          <Button icon={FaGoogle} className="btn-primary" title="Continue with Google" func={() => emailSignIn()}></Button>
        </div>
      </main>
    )
  }


}
