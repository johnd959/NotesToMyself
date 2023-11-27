import { User } from "firebase/auth";
import { db } from "../_utils/firebase";
import { Note } from "../Types/Note";
import { collection, getDocs, addDoc, query } from "firebase/firestore";



export async function getNotes(user : User)
{
    let notes:Note[] = []; 
    const q = query(
        collection(db, "users", user.uid, "notes")
    );
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

    return notes; 

}
