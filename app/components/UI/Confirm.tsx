import { IconType } from "react-icons";
import Button from "./Button";

interface Props {
  modalID: string;
  message: string;
  actions: {
    name: string;
    action: () => void;
    Icon?: IconType;
  }[];
}

export default function Confirm({ modalID, message, actions }: Props) {
  return (
    <dialog id={modalID} className="modal">
      <div className="bg-black modal-box flex flex-col items-center justify-between ring-2 ring-error gap-4">
        <div className="text-error font-bold text-center">{message}</div>
        <div className="flex flex-row gap-2">
          {actions.map((action) => (
            <Button
              key={action.name}
              className="btn btn-error"
              func={action.action}
              title={action.name}
              Icon={action.Icon}
            ></Button>
          ))}
          <button
            className="btn btn-primary"
            onClick={() => {
              const modal = document.getElementById(modalID);
              if (modal instanceof HTMLDialogElement) {
                modal.close();
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
