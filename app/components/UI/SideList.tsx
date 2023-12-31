import { Folder } from "@/app/Types/Folder";
import { Group } from "@/app/Types/Group";
import FolderTab from "../Notes/FolderTab";

type Props = {
    tabList: Folder[] | Group[],
    setFilter: Function,
    toggleDrawer: Function,
    handleDelete: Function,
    className?: string
}


export default function SideList({tabList, setFilter, handleDelete, toggleDrawer, className}:Props){
    return(
        <ul className={"flex flex-col gap-2 py-2 overflow-y-auto max-h-screen " + `${className}`}>
            {tabList.length > 0 && tabList.map((tab) => <FolderTab handleDelete={handleDelete} func={() => {setFilter(tab); toggleDrawer();}} key={tab.id} tab={tab}></FolderTab>)}
        </ul>
    )
}