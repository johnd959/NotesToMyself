import { IconType } from "react-icons"

interface Props {
    modalID:string,
    title:string,
    message:string,
    actions:{
        action:string,
        Icon:IconType,
    }
}

export default function Confirm({modalID, title, message, actions}:Props){
    return(
        <dialog id={modalID} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">Close</button>
            </form>
          </div>
         </div>
      </dialog>
    )
}