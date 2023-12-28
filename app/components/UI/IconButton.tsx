import { IconType } from "react-icons"


type Props = {
    func?: Function,
    className?: String,
    Icon: IconType,
    IconColor?:string,
    hover?: string,
    type?:"button" | "submit" | "reset" | undefined,


}


export default function IconButton({func, className, Icon, type, hover, IconColor}:Props){
    return(
        <li className="list-none">
            <button type={type} onSubmit={() => {func? func() : {}}} className={"cursor-pointer flex flex-row justify-center items-center transition-all duration-400 ease-in-out " + `${className}` }>
            <Icon color={IconColor} size={25}/>
            </button>
        </li>
    )
}