import { IconType } from "react-icons"

type Props = {
    func?: Function,
    className?: String,
    Icon: IconType,
    hover?: string


}


export default function IconButton({func, className, Icon, hover}:Props){
    return(
        <li onClick={() => {func? func() : {}}} className={"cursor-pointer flex flex-row justify-center items-center py-2 transition-all duration-400 ease-in-out " + `${className}` }>
            <Icon size={25}/>
        </li>
    )
}