import { Folder } from "@/app/Types/Folder";
import { Group } from "@/app/Types/Group";
import FolderTab from "../Notes/FolderTab";

type Props = {
    tabList: Folder[] | Group[],
    setFilter: Function,
    handleDelete: Function
}


export default function SideList({tabList, setFilter, handleDelete}:Props){
    return(
        <ul className="flex flex-col gap-2 py-2 overflow-auto max-h-screen">
            {tabList.length > 0 && tabList.map((tab) => <FolderTab handleDelete={handleDelete} func={() => setFilter(tab.id, true)} key={tab.id} tab={tab}></FolderTab>)}
        </ul>
    )
}