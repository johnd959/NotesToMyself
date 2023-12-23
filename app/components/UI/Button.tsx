import React from "react";
import { IconType } from "react-icons";

type Props = {
  func: Function;
  title?: string;
  className?: string;
  Icon?: IconType,
  iconSize?: number
};

function Button({func, title, className, Icon, iconSize=30}:Props) {
  return <button className={"btn flex flex-row  " + className + ` ${Icon != null ? "justify-between" : ""}`} onClick={() => func()}>
    {Icon != null? <Icon size={iconSize}/> : <></>}
    {title}
    </button>;
}

export default Button;
