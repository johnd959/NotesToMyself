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
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { reg } from "../Types/regex";
import { set } from "firebase/database";
import { stringifyError } from "next/dist/shared/lib/utils";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[errM, setErrM] = useState(""); 
 
  const gitHubSignIn = async () => {

    const provider = new GithubAuthProvider();      
    try{
      const gitHubCredential = await signInWithPopup(auth, provider); 
    } catch (ex){
      if (ex.code == "auth/account-exists-with-different-credential"){
        // The account exist with a different credential
        let email = ex.email;
        let pendingCredential = ex.credential; 
        console.log(ex);
        //Get list of sign-in methods for the conflicting user
        // let userSignInMethods = await fetchSignInMethodsForEmail(auth, email); 
        // console.log(userSignInMethods); 
    }
  };
}

  const emailSignIn = async () => {
    const googProvider = new GoogleAuthProvider();
    try{
      let googleCredential = await signInWithPopup(auth, googProvider); 
    }catch(ex){
      console.log("Google cred error");
      if (ex.code == "account-exists-with-different-credential"){
        // The account exist with a different credential
        let email = ex.email;
        let pendingCredential = ex.credential; 

        //Get list of sign-in methods for the conflicting user
        let userSignInMethods = await auth.fetchSignInMethodsForEmail(email); 
        console.log(userSignInMethods); 
      }
    }

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
      return true;
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
    return false;
  }

  const signIn = async (email, password) => {
    try{
      if(email.trim() === ""){
        throw {code: "app/email-empty"};
      }else if(reg.email.test(email.trim()) == false){
        throw {code: "app/invalid-email"};
      }
      else if(password.trim() === ""){
        throw {code: "app/empty-password"};
      }
      let userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim()); 
      setErrM("");
      return true; 
    } catch(ex){
      if(ex.code == "app/email-empty") {
        setErrM("Please enter an email"); 
      }
      else if(ex.code == 'auth/invalid-email' || ex.code == "app/invalid-email"){
        setErrM("Invalid Email");
      }
      else if(ex.code == "app/empty-password" || ex.code == "auth/missing-password"){
        setErrM("Please enter a password");
      }
      else if(ex.code == "auth/invalid-credential"){
        setErrM("Wrong Password"); 
      }
      else{
        setErrM("Something went wrong, please try again");
      }
    }
    return false;
  }

  const resetPassword = async (email) => {
    try{
      if(email.trim() === ""){
        throw {code: "app/email-empty"};
      }
      else if(reg.email.test(email.trim()) == false){
        throw {code: "app/invalid-email"};
      }
      await sendPasswordResetEmail(auth, email.trim()); 
      setErrM(""); 
      return true; 
    }
    catch(ex){
      if(ex.code == "app/email-empty") {
        setErrM("Please enter an email"); 
      }
      else if(ex.code == "app/invalid-email"){
        setErrM("Please enter a valid email");
      }
      else if(ex.code == 'auth/invalid-email'){
        setErrM("Invalid Email");
      } else if (ex.code == 'auth/missing-email'){
        setErrM("Please enter an email"); 
      }
    }
    return false;
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
    <AuthContext.Provider value={{ user, errM, gitHubSignIn, firebaseSignOut, emailSignIn, signIn, createUser, setErrM, resetPassword  }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};