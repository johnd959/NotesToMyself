import { User } from "firebase/auth";
import { db } from "../_utils/firebase";
import { Note } from "../Types/Note";
import { collection, getDocs, addDoc, query, doc, updateDoc, deleteDoc, setDoc, deleteField, where } from "firebase/firestore";
import { FocusEventHandler } from "react";
import { Folder } from "../Types/Folder";


// export async function createUser(user: User){
//     try{
//         const docRef = addDoc(collection(db, "users"), ); 
//     }
//     catch(ex:any){
//         console.error(ex); 
//     }
// }

export async function getNotes(user : User)
{
    let notes:Note[] = [];  
    const q = query(
        collection(db, "users", user.uid, "notes")
    );
    

    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let data = doc.data(); 
            notes.push(
                    {
                        id: doc.id, 
                        title: data.title,
                        content: data.content,
                        date: data.date.toDate(),
                        folder: data.folder
                    }
                );
   
        });
        console.log("reading from FireBase at getNotes");
    }
    catch(ex : any){
        console.log(ex); 
    }
    
    return notes; 

}


export async function updateNote(user: User, note: Note){
    if(note && note.id.length !== 0)
    {
        const docRef = doc(db, "users", user.uid, "notes", note.id); 
        try{
                await updateDoc(docRef, {
                    title: note.title,
                    content: note.content,
                    date: note.date,
                    folder: note.folder
                }); 
        
                console.log("writing to FireBase at updateNote");
            }catch(ex :any){
            console.log(ex); 
        }
    }
}

export async function createNote(user: User, note: Note)
{
    try{
        const docRef = await addDoc(
            collection(db, "users", user.uid, "notes"),
            note
            
        )
        console.log("writing to FireBase at createNote");
        return docRef?.id;
    }
    catch(ex : any){
        console.log(note);
        console.log(ex);
    }
}

export async function deleteNote(user:User, note:Note) {
    try{
        const docRef = doc(db, "users", user.uid, "notes", note.id);
        await deleteDoc(docRef);
        console.log("writing to FireStore at deleteNote");
    }
    catch(ex :any)
    {
        console.log(ex);
    }
}
export async function deleteAllNotes(user:User) {
    try{
        const q = query(
            collection(db, "users", user.uid, "notes")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteNote(user, {
                id: doc.id, 
                title: doc.data().title,
                content: doc.data().content,
                date: doc.data().date.toDate()
            });
        });
        console.log("reading from Firestore");
    }
    catch(ex :any)
    {
        console.log(ex);
    }
}

export async function createFolder(user: User, folder: Folder)
{
    try{
        const docRef = await addDoc(
            collection(db, "users", user.uid, "folders"),
            folder
        )
        console.log("writing to FireBase at createFolder");
        return docRef?.id;
    }
    catch(ex : any){
        console.log(ex);
    }
}

export async function getFolders(user : User)
{
    let folders:Folder[] = [];  
    const q = query(
        collection(db, "users", user.uid, "folders")
    );
    

    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let data = doc.data(); 
            folders.push(
                {
                    id: doc.id, 
                    name: data.name,
                }
            );
        });
        console.log("reading from FireStore at getFolders");
    }
    catch(ex : any){
        console.log(ex); 
    }
    
    return folders; 

}

export async function deleteFolder(user:User, folder:Folder) {
    try{
        const docRef = doc(db, "users", user.uid, "folders", folder.id);
        await deleteDoc(docRef);
        const q = query(
            collection(db, "users", user.uid, "notes"),
            where("folder", "==", folder.id )
        );

        const querySnapshot = await getDocs(q); 
        querySnapshot.forEach(async (document) => await updateDoc(doc(db, "users", user.uid, "notes", document.id), {
            folder: deleteField()
        })); 
        console.log("writing to FireStore at deleteFolder");
    }
    catch(ex :any)
    {
        console.log(ex);
    }
}

export async function updateFolder(user: User, folder: Folder){
    if(folder && folder.id.length !== 0)
    {
        const docRef = doc(db, "users", user.uid, "folders", folder.id); 
        try{
            await updateDoc(docRef, {
                name: folder.name
            }); 
            console.log("writing to FireStore at updateFolder");
        }
        catch(ex :any){
            console.log(ex); 
        }
    }
}

export async function deleteAccountContents(user:User) {
    try{
        const docRef = doc(db, "users", user.uid);
        await deleteDoc(docRef);
        console.log("writing to FireStore at deleteAccountContents");
    }
    catch(ex :any)
    {
        console.log(ex);
    }
}