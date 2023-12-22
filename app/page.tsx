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
import { VscGithubAlt, VscAccount, VscArrowLeft } from "react-icons/vsc";
import { FaGoogle } from "react-icons/fa";

export default function Home() {


  const { user, gitHubSignIn, signIn, emailSignIn, createUser, errM, setErrM } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [createAccount, setCreateAccount] = useState(false);


  async function handleSignIn(email:string, password:string){
    await signIn(email, password);
    setEmail("");
    setPassword("");
  }

  async function handleCreateAccount(email:string, password:string){
    await createUser(email, password)
    setEmail("");
    setPassword(""); 
  }

  if(user !== null)
  {
    redirect("/notes", RedirectType.push); 
    return(
      <Link href="/notes">Click if redirect does not work</Link>
    )
  }
  else if(!createAccount){
    return(
      <main className="flex flex-col justify-center items-center gap-2 min-h-screen">
        <div className="flex flex-col justify-center gap-2 bg-black p-12 rounded-xl">
          <h1 className="text-center text-white mb-5 text-lg">Notes to Myself</h1>
          <div className="flex flex-col gap-2">
            <input type="email" placeholder="Email" className="input input-sm min-w-full" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" placeholder="Password" className="input input-sm min-w-full" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <div className="label">{errM !== "" ? <span className="text-error label-text">{errM}</span> : <p></p>}</div>
            <Button className="btn btn-primary px-6" title="Sign In" func={() => handleSignIn(email, password)}></Button>
          </div>
          <div className="flex flex-row items-center">
            <hr className="text-white w-6/12"/>
            <p className="text-white mx-2">Or</p>
            <hr className="text-white w-6/12"></hr>            
          </div>
          <Button icon={VscGithubAlt} className="btn-primary" title="Continue with GitHub" func={() => gitHubSignIn()}></Button>
          <Button icon={FaGoogle} className="btn-primary" title="Continue with Google" func={() => emailSignIn()}></Button>
          <Button icon={VscAccount} className="btn-primary" title="Create an account" func={() => {setCreateAccount(true); setErrM("");}}></Button>
        </div>
      </main>
    )
  } else {
    return(
    <main>
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center gap-2 bg-black p-12 rounded-xl">
          <h1 className="text-center text-white mb-5 text-lg">Notes to Myself</h1>
          <div className="flex flex-col gap-2">
            <div className="tooltip tooltip-right tooltip-primary text-left" data-tip="Emails are used for password resets"><input type="email" placeholder="Email" className="input input-sm w-full" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input></div>
            <div className="tooltip tooltip-right tooltip-primary text-left" data-tip="No preceding or trailing spaces"><input type="password" placeholder="Password" className="input input-sm w-full" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input></div>
            <div className="label">{errM !== ""? <span className="label-text text-error">{errM}</span> : <p></p>}</div>
            <div className="flex flex-row gap-2 items-center justify-center"><Button title="Back" className="btn-primary rounded-r-none w-6/12" func={() => {setCreateAccount(false); setErrM("");}}></Button><Button className="btn btn-primary px-6 rounded-l-none w-6/12" title="Next" func={() => handleCreateAccount(email, password)}></Button></div>
          </div>
        </div>
      </main>
    </main>      
    )

  }


}
