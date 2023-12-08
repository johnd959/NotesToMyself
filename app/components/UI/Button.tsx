import React from "react";
import { IconType } from "react-icons";

type Props = {
  func: Function;
  title: string;
  className?: string;
  icon?: IconType
};

function Button(props: Props) {
  return <button className={"btn flex flex-row  " + props.className + ` ${props.icon != null ? "justify-between" : ""}`} onClick={() => props.func()}>
    {props.icon != null? <props.icon size={30}/> : <></>}
    {props.title}
    </button>;
}

export default Button;
