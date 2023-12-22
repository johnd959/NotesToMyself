"use client";
 
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import { auth } from "./firebase";
import { reg } from "../Types/regex";
import { set } from "firebase/database";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[errM, setErrM] = useState(""); 
 
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailSignIn = () => {
    const googProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googProvider); 
  }

  const createUser = async (email, password) => {
    try{
      if(email.trim() === ""){
        throw {code: "app/email-empty"};
      }
      else if(reg.email.test(email.trim()) == false){
        throw {code: "app/invalid-email"};
      }
      else if(password.trim() === ""){
        throw {code: "app/empty-password"};
      }
      let userCredential = await createUserWithEmailAndPassword(auth, email, password); 
      setErrM(""); 

    }catch(ex){
      if(ex.code == "app/email-empty") {
        setErrM("Please enter an email"); 
      }
      else if(ex.code == "app/invalid-email"){
        setErrM("Please enter a valid email");
      }
      else if(ex.code == "app/empty-password"){
        setErrM("Please enter a password");
      }
      else if(ex.code == "auth/email-already-in-use"){
        setErrM("An account with this email exists")
      }
    }
  }

  const signIn = async (email, password) => {
    try{
      let userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim()); 
      setErrM("");
    } catch(ex){
      if(ex.code == 'auth/invalid-email'){
        setErrM("Invalid Email");
      }
      else if(ex.code == "auth/missing-password"){
        setErrM("Please enter a password");
      }
      else if(ex.code == "auth/invalid-credential"){
        setErrM("Invalid Password"); 
      }
      else{
        setErrM("Something went wrong, please try again");
      }
    }
  }
 
  const firebaseSignOut = () => {
    return signOut(auth);
  };

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
 
  return (
    <AuthContext.Provider value={{ user, errM, gitHubSignIn, firebaseSignOut, emailSignIn, signIn, createUser, setErrM,  }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};