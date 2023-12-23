"use client"; 


import { useState } from "react";

import { useUserAuth } from "./_utils/auth-context";
import Button from "./components/UI/Button";
import { RedirectType, redirect } from "next/navigation";
import { VscGithubAlt, VscAccount } from "react-icons/vsc";
import { FaGoogle } from "react-icons/fa";
import Link from 'next/link'

export default function Home() {


  const { user, gitHubSignIn, signIn, emailSignIn, createUser, errM, setErrM, resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [menu, setMenu] = useState(1);


  async function handleSignIn(){
    let success:boolean = await signIn(email, password);
    if(success){
      setEmail("");
      setPassword("");
    }
  }

  async function handleCreateAccount(){
    let success:boolean = await createUser(email, password)
    if(success){
      setEmail("");
      setPassword("");
    } 
  }

  async function handlePasswordReset(){
    let success:boolean = await resetPassword(email);
    if(success){
      setEmail("");
      let modal = document.getElementById("reset_modal");
      if (modal instanceof HTMLDialogElement){
        console.log("modal"); 
        modal.showModal(); 
      } 
    }
  }

  function handleGoBack(){
    setMenu(1); 
    setErrM("");
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
  else if(menu == 1){
    return(
      <main className="flex flex-col justify-center items-center gap-2 min-h-screen">
        <div className="flex flex-col justify-center gap-2 bg-black p-12 rounded-xl">
          <h1 className="text-center text-white mb-5 text-lg">Notes to Myself</h1>
          <div className="flex flex-col gap-2">
            <input type="email" placeholder="Email" className="input input-sm min-w-full" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
            <input type="password" placeholder="Password" className="input input-sm min-w-full" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input>
            <div className={"label " + `${errM == "" ? "hidden" : ""}`}>{errM !== "" ? <span className="text-error label-text">{errM}</span> : <p></p>}</div>
            <Button className="btn btn-primary px-6" title="Sign In" func={() => handleSignIn()}></Button>
            <div className="label"><a className="label-text text-info cursor-pointer" onClick={() => setMenu(3)}>Forgot Password?</a></div>
          </div>
          <div className="flex flex-row items-center">
            <hr className="text-white w-6/12"/>
            <p className="text-white mx-2">Or</p>
            <hr className="text-white w-6/12"></hr>            
          </div>
          <Button Icon={VscGithubAlt} className="btn-primary" title="Continue with GitHub" func={() => gitHubSignIn()}></Button>
          <Button Icon={FaGoogle} className="btn-primary" title="Continue with Google" func={() => emailSignIn()}></Button>
          <Button Icon={VscAccount} className="btn-primary" title="Create an account" func={() => {setMenu(2); setErrM("");}}></Button>
        </div>
      </main>
    )
  } else if (menu == 2) {
    return(
      <main className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center gap-2 bg-black p-12 rounded-xl">
          <h1 className="text-center text-white mb-5 text-lg">Create an Account</h1>
          <div className="flex flex-col gap-2">
            <div className="tooltip tooltip-right tooltip-primary text-left" data-tip="Emails are used for password resets"><input type="email" placeholder="Email" className="input input-sm w-full" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input></div>
            <div className="tooltip tooltip-right tooltip-primary text-left" data-tip="No preceding or trailing spaces"><input type="password" placeholder="Password" className="input input-sm w-full" value={password} onChange={(e) => setPassword(e.currentTarget.value)}></input></div>
            <div className="label">{errM !== ""? <span className="label-text text-error">{errM}</span> : <p></p>}</div>
            <div className="flex flex-row gap-2 items-center justify-center"><Button title="Back" className="btn-primary rounded-r-none w-6/12" func={() => handleGoBack()}></Button><Button className="btn btn-primary px-6 rounded-l-none w-6/12" title="Next" func={() => handleCreateAccount()}></Button></div>
          </div>
        </div>
      </main>    
    )

  }else if (menu == 3){
    return(
        <main className="flex flex-col justify-center items-center min-h-screen">
          <dialog id="reset_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Email Sent!</h3>
              <p className="py-4">If the email is valid, a link to reset your password has been sent to the address provided.</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-primary">Close</button>
                </form>
              </div>
             </div>
          </dialog>
          <div className="flex flex-col justify-center gap-2 bg-black p-12 rounded-xl">
            <h1 className="text-center text-white mb-5 text-lg">Reset Your Password</h1>
            <div className="flex flex-col gap-2">
              <div className="tooltip tooltip-right tooltip-primary text-left" data-tip="A password reset email will be sent to this address"><input type="email" placeholder="Email" className="input input-sm w-full" value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input></div>
              <div className="label">{errM !== ""? <span className="label-text text-error">{errM}</span> : <p></p>}</div>
              <div className="flex flex-row gap-2 items-center justify-center"><Button title="Back" className="btn-primary rounded-r-none w-6/12" func={() => handleGoBack()}></Button><Button className="btn btn-primary px-6 rounded-l-none w-6/12" title="Next" func={() => handlePasswordReset()}></Button></div>
            </div>
          </div>
        </main>     
      )
  }


}
