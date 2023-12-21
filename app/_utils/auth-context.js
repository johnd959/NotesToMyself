"use client";
 
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 
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
      let userCredential = await createUserWithEmailAndPassword(auth, email, password); 

    }catch(ex){
      console.error(ex); 
    }
  }

  const signIn = async (email, password) => {
    try{
      let userCredential = await signInWithEmailAndPassword(auth, email, password); 
    } catch(ex){
      console.error(ex); 
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
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut, emailSignIn, signIn, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};