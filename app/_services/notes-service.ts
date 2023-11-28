import { User } from "firebase/auth";
import { db } from "../_utils/firebase";
import { Note } from "../Types/Note";
import { collection, getDocs, addDoc, query } from "firebase/firestore";



export async function getNotes(user : any)
{
    let notes:Note[] = []; 
    console.log("In getNotes with: " + user.uid); 
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
