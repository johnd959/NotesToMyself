import React from "react";

type Props = {
  func: Function;
  title: string;
  className?: string;
};

function Button(props: Props) {
  return <button className={"btn " + props.className} onClick={() => props.func()}>{props.title}</button>;
}

export default Button;
