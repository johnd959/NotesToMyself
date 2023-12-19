import { createContext, useContext, useEffect } from "react";
import { getNotes } from "../_services/notes-service";
import { useUserAuth } from "./auth-context";


const NotesContext = createContext(); 

export default function NoteContextProvider({children}){
    const [notes, setNotes] = useState([]); 
    const {user} = useUserAuth(); 

    async function handleLoadNotes(){
        try{
            let notes = await getNotes(user);
            setNotes(notes); 
        }
        catch(ex){
            console.error(ex); 
        }
    }

    useEffect(
        () => {
            handleLoadNotes();
        },
        [user]
    )
    return(
        <NotesContext.Provider value={{notes, setNotes, handleLoadNotes}}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotesContext(){
    return useContext(NotesContext); 
}