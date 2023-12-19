import { Folder } from "@/app/Types/Folder"
import { Group } from "@/app/Types/Group"
import { deleteFolder } from "@/app/_services/notes-service"
import { useUserAuth } from "@/app/_utils/auth-context"
import { VscTrash } from "react-icons/vsc";

type Props = {
    tab:Folder,
    func: Function,
    handleDelete: Function
}



export default function SideTab({tab, func, handleDelete}:Props){
    const {user} = useUserAuth(); 
    return(
        <li className="flex flex-row justify-between items-center join">
            <div className="flex-1 btn join-item text-left" onClick={() => func()}>
            <h3>{tab.name}</h3> 
            </div>
            <div className="flex-3 btn join-item" onClick={() => handleDelete(tab)}>
                <VscTrash size={20}/>
            </div>
        </li>
    )
}