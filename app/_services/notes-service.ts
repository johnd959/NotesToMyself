import { User } from "firebase/auth";
import { db } from "../_utils/firebase";
import { Note } from "../Types/Note";
import { collection, getDocs, addDoc, query, doc, updateDoc, deleteDoc } from "firebase/firestore";



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
                    date: data.date
                }
            );
        });
    }
    catch(ex : any){
        console.log(ex); 
    }
    
    return notes; 

}

export async function updateNote(user: User, note: Note)
{
    if(note && note.id.length !== 0)
    {
        const docRef = doc(db, "users", user.uid, "notes", note.id); 
        try{
            await updateDoc(docRef, {
                title: note.title,
                content: note.content,
                date: note.date
            }); 
        }
        catch(ex :any){
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
        console.log(docRef.id + " created.");
        return docRef?.id;
    }
    catch(ex : any){
        console.log(ex);
    }
}

export async function deleteNote(user:User, note:Note) {
    try{
        const docRef = doc(db, "users", user.uid, "notes", note.id);
        await deleteDoc(docRef);
    }
    catch(ex :any)
    {
        console.log(ex);
    }
}